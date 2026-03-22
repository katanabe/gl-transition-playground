// Glitch
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float strength = sin(progress * 3.14159) * 0.15;
  float blockY = floor(vUv.y * 20.0) / 20.0;
  float r = random(vec2(blockY, floor(progress * 10.0)));
  float offsetX = (r - 0.5) * strength;
  float colorSplit = strength * 0.5;

  vec2 uv = vUv;
  uv.x += step(0.5, r) * offsetX;

  vec4 from = texture2D(texFrom, uv);
  vec4 to = texture2D(texTo, uv);

  // RGB split
  float rCh = mix(
    texture2D(texFrom, uv + vec2(colorSplit, 0.0)).r,
    texture2D(texTo, uv + vec2(colorSplit, 0.0)).r,
    progress
  );
  float bCh = mix(
    texture2D(texFrom, uv - vec2(colorSplit, 0.0)).b,
    texture2D(texTo, uv - vec2(colorSplit, 0.0)).b,
    progress
  );

  vec4 base = mix(from, to, progress);
  gl_FragColor = vec4(rCh, base.g, bCh, 1.0);
}
