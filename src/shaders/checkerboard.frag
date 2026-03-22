// Checkerboard
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 cells = vec2(8.0, 6.0);
  vec2 cellId = floor(vUv * cells);
  float checker = mod(cellId.x + cellId.y, 2.0);
  // Even cells reveal first, odd cells reveal later
  float threshold = checker == 0.0
    ? smoothstep(0.0, 0.6, progress)
    : smoothstep(0.4, 1.0, progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, threshold);
}
