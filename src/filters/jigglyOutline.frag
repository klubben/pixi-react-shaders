/**
   havely influensed by https://godotshaders.com/shader/animated-and-gradient-outlines/
*/

varying vec2 vTextureCoord;
varying vec4 vOutputFrame;
uniform float time;
uniform sampler2D uSampler;
uniform sampler2D noiseTexture;

uniform float max_line_width;
uniform float min_line_width;
uniform float freq;
uniform float block_size;
uniform vec4 starting_colour;
uniform vec4 ending_colour;

const float pi = 3.1415;
const int ang_res = 16;
const int grad_res = 8;

float hash(vec2 p, float s) {
    return fract(35.1 * sin(dot(vec3(112.3, 459.2, 753.2), vec3(p, s))));
}

float noise() {
    return sin(time / 2.0 + vTextureCoord.y * 10.0) * 0.5 + 0.5;
}

float getLineWidth(vec2 p, float s) {
    p /= block_size;
    float w = 0.0;
    float intensity = 1.0;
    for (int i = 0; i < 3; i++) {
        w = mix(w, noise(), intensity);
        p /= 2.0;
        intensity /= 2.0;
    }

    return mix(max_line_width, min_line_width, w);
}

bool pixelInRange(sampler2D text, vec2 uv, vec2 dist) {
    float alpha = 0.0;
    for (int i = 0; i < ang_res; i++) {
        float angle = 2.0 * pi * float(i) / float(ang_res);
        vec2 disp = dist * vec2(cos(angle), sin(angle));
        if (texture2D(text, uv + disp).a > 0.0) return true;
    }
    return false;
}

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

void main() {
    vec2 TEXTURE_PIXEL_SIZE = 1.0 / vOutputFrame.ba;
    float timeStep = floor(freq * time);
    vec2 scaledDist = TEXTURE_PIXEL_SIZE;
    scaledDist *= getLineWidth(vTextureCoord / TEXTURE_PIXEL_SIZE, timeStep);
    float w = getClosestDistance(uSampler, vTextureCoord, scaledDist);

    if ((w > 0.0) && (texture2D(uSampler, vTextureCoord).a < 0.2)) {
        gl_FragColor = mix(starting_colour, ending_colour, sin(w));
    }
    else {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }

}