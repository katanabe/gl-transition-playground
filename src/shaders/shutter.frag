// Shutter (Camera Iris)
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 p = vUv - vec2(0.5);
  float angle = atan(p.y, p.x);
  float r = length(p);
  // 6-blade iris
  float blade = abs(cos(angle * 3.0));
  float irisR = mix(0.0, 1.2, progress) * (0.7 + 0.3 * blade);
  float t = smoothstep(irisR + 0.01, irisR - 0.01, r);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
