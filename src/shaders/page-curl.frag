// Page Curl (simplified)
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  // curl line moves from left to right, slightly overshooting
  float curl = progress * 1.2;
  float x = vUv.x;

  if (x < curl - 0.05) {
    // Fully revealed - clean destination
    gl_FragColor = texture2D(texTo, vUv);
  } else if (x < curl) {
    // Shadow edge near curl line
    float shadow = smoothstep(curl - 0.05, curl, x);
    gl_FragColor = texture2D(texTo, vUv) * (0.85 + 0.15 * shadow);
  } else {
    // Still covered by from page
    float dist = x - curl;
    float remaining = 1.0 - curl + 0.001;
    float bend = dist / remaining;
    float wave = sin(bend * 3.14159) * 0.015 * (1.0 - bend);
    vec2 uv = vec2(x, vUv.y + wave);
    // Subtle shadow near the curl edge
    float shade = 1.0 - 0.2 * (1.0 - smoothstep(0.0, 0.15, dist));
    gl_FragColor = texture2D(texFrom, uv) * shade;
  }
}
