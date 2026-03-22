// Radial Blur
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  vec2 dir = vUv - center;
  float angle = atan(dir.y, dir.x);
  float dist = length(dir);
  float strength = sin(progress * 3.14159) * 0.08;

  vec4 colorFrom = vec4(0.0);
  vec4 colorTo = vec4(0.0);
  const int samples = 10;
  for (int i = 0; i < samples; i++) {
    float t = float(i) / float(samples) - 0.5;
    float a = angle + t * strength;
    vec2 sampleUv = center + vec2(cos(a), sin(a)) * dist;
    colorFrom += texture2D(texFrom, sampleUv);
    colorTo += texture2D(texTo, sampleUv);
  }
  colorFrom /= float(samples);
  colorTo /= float(samples);

  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  float blur = sin(progress * 3.14159);
  vec4 sharpMix = mix(from, to, smoothstep(0.3, 0.7, progress));
  vec4 blurMix = mix(colorFrom, colorTo, smoothstep(0.3, 0.7, progress));
  gl_FragColor = mix(sharpMix, blurMix, blur);
}
