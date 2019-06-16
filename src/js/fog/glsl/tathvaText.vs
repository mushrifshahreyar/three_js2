varying vec2 vUv;
uniform float time;
varying float now;
void main()
{
    now = time;
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}