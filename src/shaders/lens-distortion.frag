// Lens Distortion
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  vec2 uv = vUv - center;
  float dist = length(uv);
  float strength = sin(progress * 3.14159) * 2.0;
  float distortion = 1.0 + dist * dist * strength;
  vec2 distortedUv = uv * distortion + center;
  distortedUv = clamp(distortedUv, 0.0, 1.0);

  vec4 from = texture2D(texFrom, distortedUv);
  vec4 to = texture2D(texTo, distortedUv);
  gl_FragColor = mix(from, to, smoothstep(0.3, 0.7, progress));
}
