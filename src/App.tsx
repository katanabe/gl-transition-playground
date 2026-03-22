import { useState } from 'react'
import { transitions } from './shaders'
import { easings } from './easings'
import { TransitionPreview } from './components/TransitionPreview'
import './App.css'

const PRESETS = [
  { label: 'Mountain', src: '/images/a.jpg' },
  { label: 'City', src: '/images/b.jpg' },
  { label: 'Beach', src: '/images/c.jpg' },
  { label: 'Snow', src: '/images/d.jpg' },
  { label: 'Lake', src: '/images/e.jpg' },
  { label: 'Forest', src: '/images/f.jpg' },
]

function App() {
  const [duration, setDuration] = useState(1500)
  const [imageA, setImageA] = useState(PRESETS[0].src)
  const [imageB, setImageB] = useState(PRESETS[1].src)
  const [easingIdx, setEasingIdx] = useState(1) // default: Ease In Out Cubic

  return (
    <div className="app">
      <header>
        <h1>GL Transition Playground</h1>
        <div className="header-controls">
          <div className="image-selectors">
            <label>
              From
              <select value={imageA} onChange={(e) => setImageA(e.target.value)}>
                {PRESETS.map((p) => (
                  <option key={p.src} value={p.src}>{p.label}</option>
                ))}
              </select>
            </label>
            <label>
              To
              <select value={imageB} onChange={(e) => setImageB(e.target.value)}>
                {PRESETS.map((p) => (
                  <option key={p.src} value={p.src}>{p.label}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Easing
            <select value={easingIdx} onChange={(e) => setEasingIdx(parseInt(e.target.value))}>
              {easings.map((e, i) => (
                <option key={e.name} value={i}>{e.name}</option>
              ))}
            </select>
          </label>
          <label>
            Duration
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
            <span>{duration}ms</span>
          </label>
        </div>
      </header>
      <main className="grid">
        {transitions.map((t) => (
          <TransitionPreview
            key={t.name}
            transition={t}
            imageA={imageA}
            imageB={imageB}
            duration={duration}
            easingFn={easings[easingIdx].fn}
          />
        ))}
      </main>
    </div>
  )
}

export default App
