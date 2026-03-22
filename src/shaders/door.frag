// Door Open
uniform float progress;
uniform sampler2D texFrom;
uniform sampler2D texTo;
varying vec2 vUv;

void main() {
  float h = progress * 0.5;
  float left = 0.5 - h;
  float right = 0.5 + h;
  vec4 from = texture2D(texFrom, vUv);
  vec4 to = texture2D(texTo, vUv);
  float inDoor = step(left, vUv.x) * (1.0 - step(right, vUv.x));
  gl_FragColor = from * (1.0 - inDoor) + to * inDoor;
}
