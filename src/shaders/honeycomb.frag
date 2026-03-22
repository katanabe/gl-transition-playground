// Honeycomb
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

// Hexagonal grid
vec2 hexCoord(vec2 uv) {
  vec2 r = vec2(1.0, 1.732);
  vec2 h = r * 0.5;
  vec2 a = mod(uv, r) - h;
  vec2 b = mod(uv - h, r) - h;
  return dot(a, a) < dot(b, b) ? a : b;
}

void main() {
  float scale = 12.0;
  vec2 hex = hexCoord(vUv * scale);
  vec2 cellId = floor((vUv * scale - hex) + 0.5);
  float r = random(cellId);
  float dist = length(hex);
  float reveal = smoothstep(0.0, 1.0, progress * 1.5 - r * 0.8);
  float hexMask = smoothstep(0.5, 0.45, dist);
  float t = reveal * hexMask + (1.0 - hexMask) * step(0.5, progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, clamp(t, 0.0, 1.0));
}
