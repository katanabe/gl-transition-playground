// Star
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 p = vUv - vec2(0.5);
  float angle = atan(p.y, p.x);
  float r = length(p);
  // Star shape modulates the effective distance
  float starShape = 0.6 + 0.4 * cos(angle * 5.0);
  float starDist = r / starShape;
  // Threshold grows to cover full screen (max starDist ~ 3.5 at corners)
  float threshold = progress * 4.0;
  // Inside star region = show "to", outside = show "from"
  float t = 1.0 - smoothstep(threshold - 0.03, threshold + 0.03, starDist);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
