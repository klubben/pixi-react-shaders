/**
   havely influensed by https://godotshaders.com/shader/animated-and-gradient-outlines/
*/
#define EPSILON 0.003

precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vOutputFrame;
varying vec4 vInputSize;
uniform float time;
uniform sampler2D uSampler;
uniform sampler2D gradient_texture;

uniform float max_line_width;
uniform float min_line_width;
uniform float freq;
uniform float block_size;
uniform vec4 starting_colour;
uniform vec4 ending_colour;

const float pi = 3.14159265359;
const int ang_res = 16;
const int grad_res = 16;

bool pixelInRange(sampler2D text, vec2 uv, vec2 dist) {
    float alpha = 0.0;
    for (int i = 0; i < ang_res; i++) {
        float angle = 2.0 * pi * float(i) / float(ang_res);
        vec2 disp = dist * vec2(cos(angle), sin(angle));
        if (texture2D(text, uv + disp).a > 0.0) return true;
    }
    return false;
}

/**
  * returns the distance from the end of original texture to the end of outline in 0-1 range
    returns -1 if the pixel is not on the outline
*/
float getClosestDistance(sampler2D text, vec2 uv, vec2 maxDist) {
    if (!pixelInRange(text, uv, maxDist)) return -1.0;

    float hi = 1.0; float lo = 0.0;

    for (int i = 1; i <= grad_res; i++) {
        float curr = (hi + lo) / 2.0;
        if (pixelInRange(text, uv, curr * maxDist)) {
            hi = curr;
        }
        else {
            lo = curr;
        }
    }
    return hi;
}

bool eq(float a, float b) {
    return abs(a - b) < EPSILON;
}

vec2 mapCoord(vec2 coord)
{
    coord *= vInputSize.xy;
    return coord;
}

void main() {
    vec2 TEXTURE_PIXEL_SIZE = 1.0 / vOutputFrame.ba;
    vec2 scaledDist = TEXTURE_PIXEL_SIZE;
    scaledDist *= max_line_width;
    float w = getClosestDistance(uSampler, vTextureCoord, scaledDist);

    vec2 mapped = vTextureCoord * vInputSize.xy;

    if (
    eq(vTextureCoord.x, .0) ||
    eq(vTextureCoord.y, .0) ||
    eq(vTextureCoord.x, .5) ||
    eq(vTextureCoord.y, .5) ||
    eq(vTextureCoord.x, .9) ||
    eq(vTextureCoord.y, .9)) {
        gl_FragColor = vec4(1.0, .0, 1.0, 1.0);
        return;
    } else
    if ((w > 0.0) && (texture2D(uSampler, vTextureCoord).a < 0.2)) {
        float x = w;
        float y = atan(vTextureCoord.y - .5, vTextureCoord.x - .5) / pi * .5 + .5;
        y = fract(y + time / freq);
        gl_FragColor = texture2D(gradient_texture, vec2(x, y));
    } else {

        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}