// Sepia Pass
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  vec4 base = mix(from, to, smoothstep(0.4, 0.6, progress));
  vec3 sepia = vec3(
    dot(base.rgb, vec3(0.393, 0.769, 0.189)),
    dot(base.rgb, vec3(0.349, 0.686, 0.168)),
    dot(base.rgb, vec3(0.272, 0.534, 0.131))
  );
  float amount = sin(progress * 3.14159);
  gl_FragColor = vec4(mix(base.rgb, sepia, amount), 1.0);
}
