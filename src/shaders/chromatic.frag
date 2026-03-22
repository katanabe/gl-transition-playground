// Chromatic Aberration
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  vec2 dir = normalize(vUv - center);
  float dist = length(vUv - center);
  float strength = sin(progress * 3.14159) * 0.04 * dist;

  vec2 rUv = vUv + dir * strength;
  vec2 gUv = vUv;
  vec2 bUv = vUv - dir * strength;

  float p = smoothstep(0.3, 0.7, progress);
  float r = mix(texture2D(texFrom, rUv).r, texture2D(texTo, rUv).r, p);
  float g = mix(texture2D(texFrom, gUv).g, texture2D(texTo, gUv).g, p);
  float b = mix(texture2D(texFrom, bUv).b, texture2D(texTo, bUv).b, p);
  gl_FragColor = vec4(r, g, b, 1.0);
}
