// Pixelate
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float cellSize = mix(1.0, 48.0, smoothstep(0.0, 0.5, progress) - smoothstep(0.5, 1.0, progress));
  vec2 pixelUv = vUv;
  if (cellSize > 1.0) {
    vec2 cells = vec2(cellSize);
    pixelUv = floor(vUv * cells) / cells + 0.5 / cells;
  }
  vec4 from = texture2D(texFrom, pixelUv);
  vec4 to = texture2D(texTo, pixelUv);
  gl_FragColor = mix(from, to, step(0.5, progress));
}
