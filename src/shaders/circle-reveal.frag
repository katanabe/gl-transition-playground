// Circle Reveal
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
  float maxDist = length(vec2(aspect, 1.0) * 0.5);
  float t = step(dist, progress * maxDist);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
