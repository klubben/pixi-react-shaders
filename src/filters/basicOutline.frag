precision mediump float;
varying vec2 vTextureCoord;
uniform float time;
uniform sampler2D uSampler;

vec4 outlineColor = vec4(1.0, 0.0, 0.0, 1.0);
void main()
{
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}