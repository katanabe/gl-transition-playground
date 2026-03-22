// Grayscale Pass
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  vec4 base = mix(from, to, smoothstep(0.4, 0.6, progress));
  float gray = dot(base.rgb, vec3(0.299, 0.587, 0.114));
  float desat = sin(progress * 3.14159);
  gl_FragColor = vec4(mix(base.rgb, vec3(gray), desat), 1.0);
}
