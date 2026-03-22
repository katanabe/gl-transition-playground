// White Out
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  float white = sin(progress * 3.14159);
  vec4 base = mix(from, to, smoothstep(0.4, 0.6, progress));
  gl_FragColor = mix(base, vec4(1.0), white);
}
