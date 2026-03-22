// Color Burn
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  float p = progress;
  // Burn blend mode: 1 - (1-to) / from
  vec4 burn = 1.0 - (1.0 - to) / (from + 0.001);
  burn = clamp(burn, 0.0, 1.0);
  float mid = sin(p * 3.14159);
  vec4 base = mix(from, to, smoothstep(0.3, 0.7, p));
  gl_FragColor = mix(base, burn, mid * 0.7);
}
