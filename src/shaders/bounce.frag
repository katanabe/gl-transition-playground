// Bounce
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  // Bounce easing: to image drops in from above
  float t = progress;
  float bounce;
  if (t < 0.3636) {
    bounce = 7.5625 * t * t;
  } else if (t < 0.7272) {
    float t2 = t - 0.5454;
    bounce = 7.5625 * t2 * t2 + 0.75;
  } else if (t < 0.9090) {
    float t2 = t - 0.8181;
    bounce = 7.5625 * t2 * t2 + 0.9375;
  } else {
    float t2 = t - 0.9545;
    bounce = 7.5625 * t2 * t2 + 0.984375;
  }
  float offset = 1.0 - bounce;
  vec2 toUv = vec2(vUv.x, vUv.y + offset);
  if (toUv.y > 1.0) {
    gl_FragColor = texture2D(texFrom, vUv);
  } else {
    gl_FragColor = texture2D(texTo, toUv);
  }
}
