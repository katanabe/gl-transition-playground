import fade from './fade.frag'
import wipeRight from './wipe-right.frag'
import wipeLeft from './wipe-left.frag'
import wipeUp from './wipe-up.frag'
import wipeDown from './wipe-down.frag'
import wipeDiagonal from './wipe-diagonal.frag'
import radialWipe from './radial-wipe.frag'
import circleReveal from './circle-reveal.frag'
import diamond from './diamond.frag'
import pixelate from './pixelate.frag'
import noiseDissolve from './noise-dissolve.frag'
import swirl from './swirl.frag'
import zoomBlur from './zoom-blur.frag'
import blinds from './blinds.frag'
import ripple from './ripple.frag'
import grid from './grid.frag'
import door from './door.frag'
import pageCurl from './page-curl.frag'
import whiteOut from './white-out.frag'
import blackOut from './black-out.frag'
import colorBurn from './color-burn.frag'
import glitch from './glitch.frag'
import liquid from './liquid.frag'
import radialBlur from './radial-blur.frag'
import spinBlur from './spin-blur.frag'
import lensDistortion from './lens-distortion.frag'
import chromatic from './chromatic.frag'
import slide from './slide.frag'
import push from './push.frag'
import cubeRotate from './cube-rotate.frag'
import flip from './flip.frag'
import mosaic from './mosaic.frag'
import honeycomb from './honeycomb.frag'
import voronoi from './voronoi.frag'
import stripesH from './stripes-h.frag'
import stripesV from './stripes-v.frag'
import bounce from './bounce.frag'
import fold from './fold.frag'
import zoomIn from './zoom-in.frag'
import zoomOut from './zoom-out.frag'
import heart from './heart.frag'
import star from './star.frag'
import crtScanline from './crt-scanline.frag'
import ink from './ink.frag'
import morph from './morph.frag'
import shutter from './shutter.frag'
import spiral from './spiral.frag'
import checkerboard from './checkerboard.frag'
import grayscale from './grayscale.frag'
import sepia from './sepia.frag'
import invert from './invert.frag'
import posterize from './posterize.frag'
import halftone from './halftone.frag'
import flipV from './flip-v.frag'
import roll from './roll.frag'
import dither from './dither.frag'
import edge from './edge.frag'
import diagonalBlinds from './diagonal-blinds.frag'

export interface TransitionDef {
  name: string
  category: string
  fragment: string
  needsResolution?: boolean
}

export const transitions: TransitionDef[] = [
  // Blend
  { name: 'Fade', category: 'Blend', fragment: fade },
  { name: 'White Out', category: 'Blend', fragment: whiteOut },
  { name: 'Black Out', category: 'Blend', fragment: blackOut },
  { name: 'Color Burn', category: 'Blend', fragment: colorBurn },

  // Geometric
  { name: 'Wipe Right', category: 'Geometric', fragment: wipeRight },
  { name: 'Wipe Left', category: 'Geometric', fragment: wipeLeft },
  { name: 'Wipe Up', category: 'Geometric', fragment: wipeUp },
  { name: 'Wipe Down', category: 'Geometric', fragment: wipeDown },
  { name: 'Wipe Diagonal', category: 'Geometric', fragment: wipeDiagonal },
  { name: 'Radial Wipe', category: 'Geometric', fragment: radialWipe },
  { name: 'Circle Reveal', category: 'Geometric', fragment: circleReveal, needsResolution: true },
  { name: 'Diamond', category: 'Geometric', fragment: diamond },
  { name: 'Blinds', category: 'Geometric', fragment: blinds },
  { name: 'Diagonal Blinds', category: 'Geometric', fragment: diagonalBlinds },
  { name: 'Grid', category: 'Geometric', fragment: grid },
  { name: 'Checkerboard', category: 'Geometric', fragment: checkerboard },
  { name: 'Door', category: 'Geometric', fragment: door },
  { name: 'Stripes H', category: 'Geometric', fragment: stripesH },
  { name: 'Stripes V', category: 'Geometric', fragment: stripesV },
  { name: 'Heart', category: 'Geometric', fragment: heart },
  { name: 'Star', category: 'Geometric', fragment: star },
  { name: 'Shutter', category: 'Geometric', fragment: shutter },
  { name: 'Spiral', category: 'Geometric', fragment: spiral },

  // Noise / Distortion
  { name: 'Noise Dissolve', category: 'Noise', fragment: noiseDissolve },
  { name: 'Glitch', category: 'Noise', fragment: glitch },
  { name: 'Liquid', category: 'Noise', fragment: liquid },
  { name: 'Ink Spread', category: 'Noise', fragment: ink },
  { name: 'Swirl', category: 'Distortion', fragment: swirl },
  { name: 'Ripple', category: 'Distortion', fragment: ripple, needsResolution: true },
  { name: 'Morph', category: 'Distortion', fragment: morph },

  // Optical / Color
  { name: 'Pixelate', category: 'Optical', fragment: pixelate },
  { name: 'Zoom Blur', category: 'Optical', fragment: zoomBlur },
  { name: 'Radial Blur', category: 'Optical', fragment: radialBlur },
  { name: 'Spin Blur', category: 'Optical', fragment: spinBlur },
  { name: 'Lens Distortion', category: 'Optical', fragment: lensDistortion },
  { name: 'Chromatic Aberration', category: 'Optical', fragment: chromatic },
  { name: 'CRT Scanline', category: 'Optical', fragment: crtScanline },
  { name: 'Halftone', category: 'Optical', fragment: halftone },
  { name: 'Dither', category: 'Optical', fragment: dither },
  { name: 'Edge Detect', category: 'Optical', fragment: edge, needsResolution: true },
  { name: 'Grayscale', category: 'Color', fragment: grayscale },
  { name: 'Sepia', category: 'Color', fragment: sepia },
  { name: 'Invert', category: 'Color', fragment: invert },
  { name: 'Posterize', category: 'Color', fragment: posterize },

  // Motion
  { name: 'Slide', category: 'Motion', fragment: slide },
  { name: 'Push', category: 'Motion', fragment: push },
  { name: 'Cube Rotate', category: 'Motion', fragment: cubeRotate },
  { name: 'Flip', category: 'Motion', fragment: flip },
  { name: 'Flip Vertical', category: 'Motion', fragment: flipV },
  { name: 'Page Curl', category: 'Motion', fragment: pageCurl },
  { name: 'Bounce', category: 'Motion', fragment: bounce },
  { name: 'Fold', category: 'Motion', fragment: fold },
  { name: 'Roll', category: 'Motion', fragment: roll },
  { name: 'Zoom In', category: 'Motion', fragment: zoomIn },
  { name: 'Zoom Out', category: 'Motion', fragment: zoomOut },

  // Special
  { name: 'Mosaic', category: 'Special', fragment: mosaic },
  { name: 'Honeycomb', category: 'Special', fragment: honeycomb },
  { name: 'Voronoi', category: 'Special', fragment: voronoi },
]
