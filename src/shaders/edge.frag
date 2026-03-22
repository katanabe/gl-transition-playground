// Edge Detection Transition
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
uniform vec2 resolution;
varying vec2 vUv;

float lum(vec4 c) {
  return dot(c.rgb, vec3(0.333));
}

float sobel(sampler2D tex, vec2 uv, vec2 texel) {
  float tl = lum(texture2D(tex, uv + vec2(-texel.x, texel.y)));
  float tm = lum(texture2D(tex, uv + vec2(0.0, texel.y)));
  float tr = lum(texture2D(tex, uv + vec2(texel.x, texel.y)));
  float ml = lum(texture2D(tex, uv + vec2(-texel.x, 0.0)));
  float mr = lum(texture2D(tex, uv + vec2(texel.x, 0.0)));
  float bl = lum(texture2D(tex, uv + vec2(-texel.x, -texel.y)));
  float bm = lum(texture2D(tex, uv + vec2(0.0, -texel.y)));
  float br = lum(texture2D(tex, uv + vec2(texel.x, -texel.y)));
  float gx = tl + 2.0 * ml + bl - tr - 2.0 * mr - br;
  float gy = tl + 2.0 * tm + tr - bl - 2.0 * bm - br;
  return sqrt(gx * gx + gy * gy);
}

void main() {
  vec2 texel = 1.0 / resolution;
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);

  // Phase 1 (0-0.4): from dissolves into its edges
  // Phase 2 (0.4-0.6): edge art
  // Phase 3 (0.6-1.0): edges fill into to
  float edgeFrom = sobel(texFrom, vUv, texel);
  float edgeTo = sobel(texTo, vUv, texel);

  float dissolve = smoothstep(0.0, 0.4, progress);   // from -> edge
  float rebuild = smoothstep(0.6, 1.0, progress);     // edge -> to
  float edgeMix = smoothstep(0.3, 0.5, progress);     // from edges -> to edges

  vec3 edgeColor = mix(vec3(edgeFrom), vec3(edgeTo), edgeMix);
  vec3 color = mix(from.rgb, edgeColor, dissolve);
  color = mix(color, to.rgb, rebuild);

  gl_FragColor = vec4(color, 1.0);
}
