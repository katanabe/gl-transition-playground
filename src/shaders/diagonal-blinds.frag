// Diagonal Blinds
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float count = 8.0;
  float diag = (vUv.x + vUv.y) * 0.5;
  float t = step(fract(diag * count), progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
