// Radial Wipe (clockwise)
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  vec2 center = vec2(0.5);
  vec2 dir = vUv - center;
  // atan2 returns -PI..PI, remap to 0..1 starting from top (12 o'clock)
  float angle = atan(dir.x, -dir.y); // top = 0
  float a = (angle + 3.14159) / 6.28318; // 0..1
  float softness = 0.01;
  float t = smoothstep(progress - softness, progress + softness, a);
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  gl_FragColor = mix(to, from, t);
}
