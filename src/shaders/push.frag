// Push
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 fromUv = vec2(vUv.x + progress, vUv.y);
  vec2 toUv = vec2(vUv.x + progress - 1.0, vUv.y);

  vec4 from = texture2D(texFrom, fract(fromUv));
  vec4 to = texture2D(texTo, fract(toUv));

  // Show from when fromUv is in [0,1], to otherwise
  gl_FragColor = fromUv.x < 1.0 ? from : to;
}
