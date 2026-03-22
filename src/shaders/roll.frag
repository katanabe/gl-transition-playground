// Roll (Scroll)
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float p = progress;
  float rollEdge = p;
  float tubeWidth = 0.08;

  if (vUv.y > 1.0 - rollEdge) {
    // Revealed area: show "to"
    gl_FragColor = texture2D(texTo, vUv);
  } else if (vUv.y > 1.0 - rollEdge - tubeWidth) {
    // Roll tube shadow
    float t = (1.0 - rollEdge - vUv.y) / tubeWidth;
    float shade = 0.4 + 0.6 * (1.0 - sin(t * 3.14159));
    vec2 uv = vec2(vUv.x, 1.0 - rollEdge - t * tubeWidth);
    gl_FragColor = texture2D(texFrom, uv) * shade;
  } else {
    gl_FragColor = texture2D(texFrom, vUv);
  }
}
