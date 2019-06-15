attribute vec3 position;
attribute vec2 uv;
attribute vec3 instancePosition;
attribute float delay;
attribute float rotate;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vColor;
varying float vBlink;

const float duration = 200.0;

#pragma glslify: calcRotateMat4Z = require(glsl-matrix/calcRotateMat4Z);
#pragma glslify: convertHsvToRgb = require(glsl-util/convertHsvToRgb)

void main(void) {
  float now = mod(time + delay * duration, duration) / duration;

  mat4 rotateMat = calcRotateMat4Z(radians(rotate * 360.0) + time * 0.1);
  vec3 rotatePosition = (rotateMat * vec4(position, 1.0)).xyz;

  vec3 moveRise = vec3(
    (now * 2.0 - 1.0) * (2500.0 - (delay * 2.0 - 1.0) * 2000.0),
    (now * 2.0 - 1.0) * 2000.0,
    sin(radians(time * 50.0 + delay + length(position))) * 30.0
    );
  vec3 updatePosition = instancePosition + moveRise + rotatePosition;

  vec3 hsv = vec3((sin(time)*0.01) + 90.0, 0.9 + sin(time)*0.1 , 0.5);
  vec3 rgb = convertHsvToRgb(hsv);
  float blink = (sin(radians(now * 360.0 * 20.0)) + 1.0) * 0.88;

  // coordinate transformation
  vec4 mvPosition = modelViewMatrix * vec4(updatePosition, 1.0);

  vPosition = position;
  vUv = uv;
  vColor = rgb;
  vBlink = blink;

  gl_Position = projectionMatrix * mvPosition;
}
