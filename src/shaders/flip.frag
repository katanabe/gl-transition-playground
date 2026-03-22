// Flip
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float p = progress;
  float flip = abs(cos(p * 3.14159));
  float persp = 0.5 + 0.5 * flip;

  vec2 uv = vec2(
    0.5 + (vUv.x - 0.5) * flip,
    0.5 + (vUv.y - 0.5) / persp
  );

  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  float shade = 0.5 + 0.5 * flip;
  if (p < 0.5) {
    gl_FragColor = texture2D(texFrom, uv) * shade;
  } else {
    vec2 flippedUv = vec2(1.0 - uv.x, uv.y);
    gl_FragColor = texture2D(texTo, flippedUv) * shade;
  }
}
