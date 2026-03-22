# GL Transition Playground

GLSL シェーダーによる画面遷移エフェクトのカタログ。58種類のトランジションパターンをブラウザ上でプレビュー・比較できる。

## Features

- 58種類のGLSLトランジション
- スライダーによる手動プログレス操作
- Play ボタンでアニメーション再生
- 11種類のイージング関数（Linear, Ease In/Out Cubic, Elastic, Bounce など）
- Duration 調整（500ms〜4000ms）
- 6枚のプリセット画像から From/To を選択

## Transitions

| Category | Patterns |
|----------|----------|
| Blend | Fade, White Out, Black Out, Color Burn |
| Geometric | Wipe (Right/Left/Up/Down/Diagonal), Radial Wipe, Circle Reveal, Diamond, Blinds, Diagonal Blinds, Grid, Checkerboard, Door, Stripes H/V, Heart, Star, Shutter, Spiral |
| Noise | Noise Dissolve, Glitch, Liquid, Ink Spread |
| Distortion | Swirl, Ripple, Morph |
| Optical | Pixelate, Zoom Blur, Radial Blur, Spin Blur, Lens Distortion, Chromatic Aberration, CRT Scanline, Halftone, Dither, Edge Detect |
| Color | Grayscale, Sepia, Invert, Posterize |
| Motion | Slide, Push, Cube Rotate, Flip, Flip Vertical, Page Curl, Bounce, Fold, Roll, Zoom In, Zoom Out |
| Special | Mosaic, Honeycomb, Voronoi |

## Tech Stack

- React + TypeScript + Vite
- Three.js（SharedRenderer + RenderTarget で WebGL コンテキスト数を1つに抑制）
- GLSL（vite-plugin-glsl でインポート）

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
src/
  shaders/         58個のフラグメントシェーダー (.frag) + 共通頂点シェーダー
    index.ts       トランジション定義のレジストリ
  hooks/
    useTransition.ts       各プレビューカードのレンダリング制御
    useSharedRenderer.ts   WebGLRenderer共有 + テクスチャキャッシュ
  easings.ts       イージング関数定義
  components/
    TransitionPreview.tsx   個別プレビューカード
  App.tsx          メインUI
```

全カードで1つの WebGLRenderer を共有し、RenderTarget 経由で各カードの 2D Canvas に転写する設計。これによりブラウザの WebGL コンテキスト数制限（通常16個）を回避。
