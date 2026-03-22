// Zoom Blur
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  float strength = 0.3 * sin(progress * 3.14159);
  vec4 colorFrom = vec4(0.0);
  vec4 colorTo = vec4(0.0);
  const int samples = 12;
  for (int i = 0; i < samples; i++) {
    float t = float(i) / float(samples);
    vec2 dir = (center - vUv) * strength * t;
    colorFrom += texture2D(texFrom, vUv + dir);
    colorTo += texture2D(texTo, vUv + dir);
  }
  colorFrom /= float(samples);
  colorTo /= float(samples);
  vec4 blurred = mix(colorFrom, colorTo, smoothstep(0.3, 0.7, progress));
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  vec4 sharp = mix(from, to, smoothstep(0.3, 0.7, progress));
  gl_FragColor = mix(sharp, blurred, sin(progress * 3.14159));
}
