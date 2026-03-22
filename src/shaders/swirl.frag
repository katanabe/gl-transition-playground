// Swirl
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  vec2 uv = vUv - center;
  float radius = length(uv);

  // Swirl strength peaks in the middle of the transition
  float strength = sin(progress * 3.14159) * 4.0;
  float falloff = 1.0 - smoothstep(0.0, 0.5, radius);
  float angle = strength * falloff;
  float s = sin(angle);
  float c = cos(angle);
  vec2 swirlUv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c) + center;

  vec4 from = texture2D(texFrom, swirlUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, progress);
}
