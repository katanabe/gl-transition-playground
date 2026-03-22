// Dithering
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

// 4x4 Bayer matrix
float bayer4(vec2 p) {
  vec2 i = floor(mod(p, 4.0));
  int idx = int(i.x) + int(i.y) * 4;
  // Bayer pattern values (0-15 normalized to 0-1)
  float m;
  if (idx == 0) m = 0.0; else if (idx == 1) m = 8.0;
  else if (idx == 2) m = 2.0; else if (idx == 3) m = 10.0;
  else if (idx == 4) m = 12.0; else if (idx == 5) m = 4.0;
  else if (idx == 6) m = 14.0; else if (idx == 7) m = 6.0;
  else if (idx == 8) m = 3.0; else if (idx == 9) m = 11.0;
  else if (idx == 10) m = 1.0; else if (idx == 11) m = 9.0;
  else if (idx == 12) m = 15.0; else if (idx == 13) m = 7.0;
  else if (idx == 14) m = 13.0; else m = 5.0;
  return m / 16.0;
}

void main() {
  float d = bayer4(gl_FragCoord.xy);
  float t = step(d, progress);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
