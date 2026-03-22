// Ripple
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  float aspect = resolution.x / resolution.y;
  vec2 uv = vUv;
  uv.x *= aspect;
  vec2 c = center;
  c.x *= aspect;
  float dist = length(uv - c);
  float amplitude = 0.03 * sin(progress * 3.14159);
  float freq = 20.0;
  vec2 offset = normalize(vUv - center) * amplitude * sin(dist * freq - progress * 30.0);
  vec4 from = texture2D(texFrom, vUv + offset);
  vec4 to = texture2D(texTo, vUv + offset);
  gl_FragColor = mix(from, to, progress);
}
