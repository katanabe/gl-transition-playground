export type EasingFn = (t: number) => number

export interface EasingDef {
  name: string
  fn: EasingFn
}

export const easings: EasingDef[] = [
  { name: 'Linear', fn: (t) => t },
  {
    name: 'Ease In Out Cubic',
    fn: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  },
  { name: 'Ease In Quad', fn: (t) => t * t },
  { name: 'Ease Out Quad', fn: (t) => 1 - (1 - t) * (1 - t) },
  {
    name: 'Ease In Out Quad',
    fn: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  },
  { name: 'Ease In Cubic', fn: (t) => t * t * t },
  { name: 'Ease Out Cubic', fn: (t) => 1 - Math.pow(1 - t, 3) },
  {
    name: 'Ease In Out Quart',
    fn: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  },
  {
    name: 'Ease Out Back',
    fn: (t) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    },
  },
  {
    name: 'Ease Out Elastic',
    fn: (t) => {
      if (t === 0 || t === 1) return t
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1
    },
  },
  {
    name: 'Ease Out Bounce',
    fn: (t) => {
      const n1 = 7.5625
      const d1 = 2.75
      if (t < 1 / d1) return n1 * t * t
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    },
  },
]
