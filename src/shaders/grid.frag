// Grid
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 cells = vec2(8.0, 6.0);
  vec2 cellUv = fract(vUv * cells);
  float t = step(cellUv.x, progress) * step(cellUv.y, progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
