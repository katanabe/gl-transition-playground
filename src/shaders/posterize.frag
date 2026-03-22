// Posterize
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  vec4 base = mix(from, to, smoothstep(0.4, 0.6, progress));
  // Levels: from many (smooth) to few (posterized) and back
  float levels = mix(32.0, 3.0, sin(progress * 3.14159));
  vec3 poster = floor(base.rgb * levels) / levels;
  float amount = sin(progress * 3.14159);
  gl_FragColor = vec4(mix(base.rgb, poster, amount), 1.0);
}
