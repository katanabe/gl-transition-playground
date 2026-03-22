// CRT Scanline
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float scanline = sin(vUv.y * 800.0) * 0.04 * sin(progress * 3.14159);
  float noise = fract(sin(dot(vUv + progress, vec2(12.9898, 78.233))) * 43758.5453);
  float staticNoise = noise * 0.1 * sin(progress * 3.14159);

  vec2 uv = vUv;
  uv.x += sin(vUv.y * 50.0 + progress * 20.0) * 0.01 * sin(progress * 3.14159);

  vec4 from = texture2D(texFrom, uv);
  vec4 to = texture2D(texTo, uv);
  vec4 base = mix(from, to, smoothstep(0.3, 0.7, progress));

  // RGB offset during transition
  float rgbShift = 0.005 * sin(progress * 3.14159);
  float r = mix(texture2D(texFrom, uv + vec2(rgbShift, 0.0)).r,
                texture2D(texTo, uv + vec2(rgbShift, 0.0)).r,
                smoothstep(0.3, 0.7, progress));
  float b = mix(texture2D(texFrom, uv - vec2(rgbShift, 0.0)).b,
                texture2D(texTo, uv - vec2(rgbShift, 0.0)).b,
                smoothstep(0.3, 0.7, progress));

  gl_FragColor = vec4(r, base.g, b, 1.0) + scanline + staticNoise;
}
