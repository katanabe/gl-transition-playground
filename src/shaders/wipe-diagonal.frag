// Wipe Diagonal
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float edge = (vUv.x + vUv.y) * 0.5;
  float softness = 0.05;
  float t = smoothstep(progress - softness, progress + softness, edge);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(to, from, t);
}
