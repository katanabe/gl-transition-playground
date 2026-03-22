// Horizontal Stripes
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float count = 12.0;
  float stripe = floor(vUv.y * count);
  float dir = mod(stripe, 2.0); // alternate direction
  float offset = mix(progress, 1.0 - progress, dir);
  float t = step(fract(vUv.x + offset * 0.5), progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
