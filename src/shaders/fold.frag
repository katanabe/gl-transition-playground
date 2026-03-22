// Fold
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float p = progress;
  // From image folds inward from left and right
  float foldWidth = 0.5 * (1.0 - p);
  float centerDist = abs(vUv.x - 0.5);

  if (centerDist < foldWidth) {
    // Still showing from, but compressed horizontally
    float u = 0.5 + (vUv.x - 0.5) / (2.0 * foldWidth + 0.001);
    float shade = 1.0 - 0.3 * sin(centerDist / (foldWidth + 0.001) * 3.14159) * p;
    gl_FragColor = texture2D(texFrom, vec2(u, vUv.y)) * shade;
  } else {
    gl_FragColor = texture2D(texTo, vUv);
  }
}
