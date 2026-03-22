// Slide (to slides over from)
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  // "to" slides in from the right, covering "from" which stays still
  float edge = 1.0 - progress;
  if (vUv.x >= edge) {
    vec2 toUv = vec2(vUv.x - edge, vUv.y);
    gl_FragColor = texture2D(texTo, toUv / vec2(progress + 0.001, 1.0));
  } else {
    gl_FragColor = texture2D(texFrom, vUv);
  }
}
