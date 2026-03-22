import { useRef, useEffect, useState } from 'react'
import { useTransition } from '../hooks/useTransition'
import { type TransitionDef } from '../shaders'
import { type EasingFn } from '../easings'

interface Props {
  transition: TransitionDef
  imageA: string
  imageB: string
  duration: number
  easingFn: EasingFn
}

export function TransitionPreview({ transition, imageA, imageB, duration, easingFn }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    setCanvas(canvasRef.current)
  }, [])

  const { progress, animate, setProgress } = useTransition(canvas, imageA, imageB, transition, easingFn)

  return (
    <div className="preview">
      <canvas ref={canvasRef} className="preview-canvas" />
      <div className="preview-controls">
        <h3>{transition.name}</h3>
        <span className="preview-category">{transition.category}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.005}
          value={progress}
          onChange={(e) => setProgress(parseFloat(e.target.value))}
        />
        <button onClick={() => animate(duration)}>Play</button>
      </div>
    </div>
  )
}
