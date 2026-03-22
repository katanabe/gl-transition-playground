// Zoom In
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float scale = 1.0 + progress * 2.0;
  vec2 fromUv = 0.5 + (vUv - 0.5) / scale;
  float fade = smoothstep(0.3, 0.7, progress);
  vec4 from = texture2D(texFrom, fromUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, fade);
}
