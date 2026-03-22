// Mosaic
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // Mosaic size: ramps up then back down
  float mosaic = sin(progress * 3.14159);
  float size = max(1.0, floor(mix(1.0, 30.0, mosaic)));
  vec2 cellId = floor(vUv * size);
  vec2 cellUv = (cellId + 0.5) / size;

  // Per-cell random reveal timing
  float r = random(cellId);
  float reveal = smoothstep(0.0, 1.0, progress * 1.5 - r * 0.5);

  // Sample from mosaic UV when pixelated, normal UV when not
  vec2 sampleUv = mosaic > 0.01 ? cellUv : vUv;
  vec4 from = texture2D(texFrom, sampleUv);
  vec4 to = texture2D(texTo, sampleUv);

  // At the very end, ensure clean output
  if (progress > 0.95) {
    float t = smoothstep(0.95, 1.0, progress);
    vec4 cleanTo = texture2D(texTo, vUv);
    gl_FragColor = mix(mix(from, to, reveal), cleanTo, t);
  } else {
    gl_FragColor = mix(from, to, reveal);
  }
}
