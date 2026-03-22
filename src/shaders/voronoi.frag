// Voronoi
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 voronoiCell(vec2 uv, float scale) {
  vec2 id = floor(uv * scale);
  float minDist = 10.0;
  vec2 closestId = id;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = id + vec2(float(x), float(y));
      vec2 point = neighbor + vec2(random(neighbor), random(neighbor + 1.0));
      float d = length(uv * scale - point);
      if (d < minDist) {
        minDist = d;
        closestId = neighbor;
      }
    }
  }
  return closestId;
}

void main() {
  vec2 cell = voronoiCell(vUv, 8.0);
  float r = random(cell);
  float t = smoothstep(0.0, 1.0, progress * 1.5 - r * 0.8);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(from, to, t);
}
