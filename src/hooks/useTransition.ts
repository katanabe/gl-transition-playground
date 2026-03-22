import { useEffect, useRef, useCallback, useState } from 'react'
import * as THREE from 'three'
import vertexShader from '../shaders/common.vert'
import { type TransitionDef } from '../shaders'
import { type EasingFn } from '../easings'
import { getSharedRenderer, loadSharedTexture } from './useSharedRenderer'

export function useTransition(
  canvas: HTMLCanvasElement | null,
  imageA: string,
  imageB: string,
  transition: TransitionDef,
  easingFn: EasingFn = (t) => t,
) {
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.OrthographicCamera
    material: THREE.ShaderMaterial
    renderTarget: THREE.WebGLRenderTarget
  } | null>(null)
  const rafRef = useRef<number>(0)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!canvas) return
    let cancelled = false

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    const width = canvas.clientWidth * window.devicePixelRatio
    const height = canvas.clientHeight * window.devicePixelRatio
    canvas.width = width
    canvas.height = height

    Promise.all([loadSharedTexture(imageA), loadSharedTexture(imageB)]).then(([texFrom, texTo]) => {
      if (cancelled) return

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      const uniforms: Record<string, THREE.IUniform> = {
        progress: { value: 0 },
        texFrom: { value: texFrom },
        texTo: { value: texTo },
      }
      if (transition.needsResolution) {
        uniforms.resolution = { value: new THREE.Vector2(width, height) }
      }

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: transition.fragment,
        uniforms,
      })

      const geometry = new THREE.PlaneGeometry(2, 2)
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const renderTarget = new THREE.WebGLRenderTarget(width, height)

      sceneRef.current = { scene, camera, material, renderTarget }

      // Initial render
      renderToCanvas(ctx, width, height)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      sceneRef.current?.renderTarget.dispose()
      sceneRef.current?.material.dispose()
      sceneRef.current = null
      ctxRef.current = null
    }
  }, [canvas, imageA, imageB, transition])

  const renderToCanvas = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const s = sceneRef.current
    if (!s) return

    const renderer = getSharedRenderer()
    renderer.setSize(width, height, false)
    renderer.setRenderTarget(s.renderTarget)
    renderer.render(s.scene, s.camera)

    // Read pixels from render target
    const pixels = new Uint8Array(width * height * 4)
    renderer.readRenderTargetPixels(s.renderTarget, 0, 0, width, height, pixels)
    renderer.setRenderTarget(null)

    // WebGL pixels are bottom-up, flip when drawing
    const imageData = new ImageData(width, height)
    for (let y = 0; y < height; y++) {
      const srcRow = (height - 1 - y) * width * 4
      const dstRow = y * width * 4
      imageData.data.set(pixels.subarray(srcRow, srcRow + width * 4), dstRow)
    }
    ctx.putImageData(imageData, 0, 0)
  }, [])

  const renderFrame = useCallback(() => {
    const ctx = ctxRef.current
    const s = sceneRef.current
    if (!ctx || !s) return
    const canvas = ctx.canvas
    renderToCanvas(ctx, canvas.width, canvas.height)
  }, [renderToCanvas])

  const animate = useCallback((duration: number = 1500) => {
    const s = sceneRef.current
    if (!s) return

    const start = performance.now()
    cancelAnimationFrame(rafRef.current)

    const tick = (now: number) => {
      const elapsed = now - start
      const linear = Math.min(elapsed / duration, 1)
      const p = easingFn(linear)
      s.material.uniforms.progress.value = p
      setProgress(p)
      renderFrame()
      if (linear < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [renderFrame])

  const setManualProgress = useCallback((p: number) => {
    const s = sceneRef.current
    if (!s) return

    cancelAnimationFrame(rafRef.current)
    s.material.uniforms.progress.value = p
    setProgress(p)
    renderFrame()
  }, [renderFrame])

  return { progress, animate, setProgress: setManualProgress }
}
