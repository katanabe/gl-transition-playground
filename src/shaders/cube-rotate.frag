// Cube Rotate
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float p = progress;

  // Perspective and shading intensity: zero at start/end, peaks at 0.5
  float intensity = sin(p * 3.14159);
  float persp = 0.4 * intensity;
  float shadeFactor = 0.3 * intensity;

  if (vUv.x < p) {
    // To face: entering from left
    float u = vUv.x / (p + 0.001);
    float depth = 1.0 - persp * (1.0 - u);
    vec2 uv = vec2(u, 0.5 + (vUv.y - 0.5) / depth);
    if (uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
      float shade = 1.0 - shadeFactor * (1.0 - u);
      gl_FragColor = texture2D(texTo, uv) * shade;
    }
  } else {
    // From face: leaving to right
    float u = (vUv.x - p) / (1.0 - p + 0.001);
    float depth = 1.0 - persp * u;
    vec2 uv = vec2(u, 0.5 + (vUv.y - 0.5) / depth);
    if (uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
      float shade = 1.0 - shadeFactor * u;
      gl_FragColor = texture2D(texFrom, uv) * shade;
    }
  }
}
