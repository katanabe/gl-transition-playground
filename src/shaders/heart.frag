// Heart
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 p = (vUv - vec2(0.5)) * vec2(2.0, -2.4) + vec2(0.0, -0.3);
  // Heart SDF
  float a = atan(p.x, p.y) / 3.14159;
  float r = length(p);
  float heartR = 0.5 * (1.0 - abs(a)) * (abs(a) + 0.2);
  float d = r - heartR;
  float radius = progress * 1.8;
  float t = 1.0 - smoothstep(radius - 0.02, radius + 0.02, d + 0.5);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, clamp(t, 0.0, 1.0));
}
