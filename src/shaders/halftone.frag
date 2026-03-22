// Halftone Dot
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  vec4 base = mix(from, to, smoothstep(0.3, 0.7, progress));
  float dotSize = mix(80.0, 10.0, sin(progress * 3.14159));
  vec2 centered = vUv - 0.5;
  vec2 cellUv = fract(centered * dotSize) - 0.5;
  float dist = length(cellUv);
  float lum = dot(base.rgb, vec3(0.299, 0.587, 0.114));
  float dotRadius = lum * 0.5;
  float amount = sin(progress * 3.14159);
  float dot = smoothstep(dotRadius + 0.02, dotRadius - 0.02, dist);
  vec3 halftoned = vec3(dot);
  gl_FragColor = vec4(mix(base.rgb, halftoned, amount * 0.8), 1.0);
}
