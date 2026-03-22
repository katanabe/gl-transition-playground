// Spiral
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 p = vUv - vec2(0.5);
  float angle = atan(p.y, p.x);
  float r = length(p);
  // Spiral: combine angle and radius
  float spiral = fract((angle / 6.28318 + r * 3.0) * 0.5);
  float t = step(spiral, progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
