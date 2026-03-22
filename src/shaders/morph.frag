// Morph
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float p = progress;
  // Warp UVs toward center during transition
  vec2 center = vec2(0.5);
  float warpStrength = sin(p * 3.14159) * 0.15;

  vec2 fromDir = center - vUv;
  vec2 toDir = vUv - center;
  vec2 fromUv = vUv + fromDir * warpStrength * p;
  vec2 toUv = vUv + toDir * warpStrength * (1.0 - p);

  vec4 from = texture2D(texFrom, fromUv);
  vec4 to = texture2D(texTo, toUv);
  gl_FragColor = mix(from, to, smoothstep(0.3, 0.7, p));
}
