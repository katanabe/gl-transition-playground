# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # tsc -b && vite build
npm run lint      # ESLint
```

## Architecture

58種類のGLSLシェーダートランジションをブラウザ上でプレビューするカタログアプリ。

```
App.tsx (画像・イージング・Duration選択)
  ↓ props
TransitionPreview.tsx (各カード)
  ↓ canvas ref
useTransition.ts (Scene/Material/RenderTarget管理、アニメーション制御)
  ↓
useSharedRenderer.ts (WebGLRendererシングルトン + テクスチャキャッシュ)
```

### WebGLコンテキスト共有設計

ブラウザのWebGLコンテキスト上限（約16個）を回避するため、**1つのWebGLRendererを全カードで共有**する。

- 共有Rendererはオフスクリーンcanvasで動作（DOMに追加しない）
- 各カードは `WebGLRenderTarget` にレンダリング → `readRenderTargetPixels` でピクセル読み取り → 2D Canvasの `putImageData` で表示
- WebGLのピクセルはボトムアップなので、転写時にY軸反転が必要
- テクスチャは `Map<url, Texture>` でキャッシュし、同一画像の重複ロードを防止

### シェーダー追加手順

1. `src/shaders/` に `.frag` ファイルを作成
2. 共通インターフェース: `uniform float progress; uniform sampler2D texFrom; uniform sampler2D texTo; varying vec2 vUv;`
3. `resolution` が必要なら `uniform vec2 resolution;` を追加
4. `src/shaders/index.ts` にimportとTransitionDef登録（`needsResolution: true` が必要なら付ける）

### GLSL注意点

- `half` はGLSL予約語。変数名に使えない
- sampler2Dを三項演算子で切り替えるのはWebGL1で動かない。両方サンプリングしてからmixする
- `step(edge, x)` の引数順に注意。xがedge以上なら1.0
- progress=0と1でクリーンな画像が表示されるよう、エフェクト強度は `sin(progress * π)` で0にするパターンが多い

### イージング

`src/easings.ts` に `EasingFn = (t: number) => number` 型で11種類定義。`useTransition` の `animate()` 内でlinear時間に適用される。
