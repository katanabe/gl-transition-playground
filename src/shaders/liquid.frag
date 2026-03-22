// Liquid
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  float n1 = noise(vUv * 6.0 + vec2(0.0, progress * 2.0));
  float n2 = noise(vUv * 8.0 - vec2(progress * 3.0, 0.0));
  float n = (n1 + n2) * 0.5;
  float edge = smoothstep(progress - 0.15, progress + 0.05, n);
  vec2 distort = vec2(n1 - 0.5, n2 - 0.5) * 0.05 * sin(progress * 3.14159);
  vec4 from = texture2D(texFrom, vUv + distort);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(to, from, edge);
}
