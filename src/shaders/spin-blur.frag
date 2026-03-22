// Spin Blur
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  vec2 uv = vUv - center;
  float strength = sin(progress * 3.14159) * 0.3;

  vec4 colorFrom = vec4(0.0);
  vec4 colorTo = vec4(0.0);
  const int samples = 12;
  for (int i = 0; i < samples; i++) {
    float t = (float(i) / float(samples) - 0.5) * strength;
    float s = sin(t);
    float c = cos(t);
    vec2 rotUv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c) + center;
    colorFrom += texture2D(texFrom, rotUv);
    colorTo += texture2D(texTo, rotUv);
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
