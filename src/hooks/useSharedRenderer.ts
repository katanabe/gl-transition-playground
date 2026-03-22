import * as THREE from 'three'

let sharedRenderer: THREE.WebGLRenderer | null = null
let sharedCanvas: HTMLCanvasElement | null = null

export function getSharedRenderer(): THREE.WebGLRenderer {
  if (!sharedRenderer) {
    sharedCanvas = document.createElement('canvas')
    sharedRenderer = new THREE.WebGLRenderer({ canvas: sharedCanvas, antialias: true })
    sharedRenderer.setPixelRatio(window.devicePixelRatio)
  }
  return sharedRenderer
}

const textureCache = new Map<string, THREE.Texture>()
const loadingPromises = new Map<string, Promise<THREE.Texture>>()

export function loadSharedTexture(url: string): Promise<THREE.Texture> {
  const cached = textureCache.get(url)
  if (cached) return Promise.resolve(cached)

  const existing = loadingPromises.get(url)
  if (existing) return existing

  const promise = new Promise<THREE.Texture>((resolve, reject) => {
    new THREE.TextureLoader().load(
      url,
      (tex) => {
        textureCache.set(url, tex)
        loadingPromises.delete(url)
        resolve(tex)
      },
      undefined,
      reject,
    )
  })
  loadingPromises.set(url, promise)
  return promise
}
