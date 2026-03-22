// Vertical Stripes
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float count = 10.0;
  float stripe = floor(vUv.x * count);
  float dir = mod(stripe, 2.0);
  float offset = mix(progress, 1.0 - progress, dir);
  float t = step(fract(vUv.y + offset * 0.5), progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
