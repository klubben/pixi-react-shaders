/**
 Ported from https://godotshaders.com/shader/various-canvas-outlines/
**/

precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vOutputFrame;
uniform float time;
uniform sampler2D uSampler;

// The texture to scroll with. : hint_default_white
uniform sampler2D scrollingTexture;
// Angle to scroll towards. In degrees. Starts at the right. : hint_range(0.0, 360.0) = 45.0
uniform float angle;
// Speed to scroll at. : hint_range(-10.0, 10.0) = 0.1
uniform float textureSpeed;
// Strength of the texture over the color. : hint_range(0.0, 1.0) = 0.5
uniform float textureStrength;

// Max distance from texture. : hint_range(0.0, 100.0) = 10.0
uniform float maxLineWidth;
// Min distance from texture. : hint_range(0.0, 100.0) = 5.0
uniform float minLineWidth;
// How often to recompute the outline. : hint_range(0.0, 10.0) = 1.0
uniform float speed;
// How big the outline blotches are. : hint_range(0.001, 100.0) = 20.0
uniform float blockSize;
// The outline color. GradientTexture1D is recommended. : source_color
uniform sampler2D color;
// The resolution for the gradient. Higher numbers will result in smoother but more expensive passes. : hint_range(1, 30) = 10
uniform int gradientResolution;
// Used to compensate for alpha values. : hint_range(0.0, 0.999) = 0.0
uniform float tolerance;


vec2 textureScale = vec2(1.0);

// Checks a fragment for the edge of an uv.
bool border(vec2 uv) {
    vec2 uvBorder = abs(uv - vec2(0.5));
    return max(step(0.5, uvBorder.x), step(0.5, uvBorder.y)) > 0.0;
}

// Gets alpha of given fragment if not near the edge.
float get_alpha(sampler2D tex, vec2 uv) {
    float res = 0.0;
    if (!border(uv)) {
        res = texture2D(tex, uv).a;
    }
    return res;
}

// Pseudorandom number
float hash(vec2 p, float s) {
    return fract(35.1 * sin(dot(vec3(112.3, 459.2, 753.2), vec3(p, s))));
}

// Noise function.
float noise(vec2 p, float s) {
    vec2 d = vec2(0, 1);
    vec2 b = floor(p);
    vec2 f = fract(p);
    return mix(
        mix(hash(b + d.xx, s), hash(b + d.yx, s), f.x),
        mix(hash(b + d.xy, s), hash(b + d.yy, s), f.x), f.y);
}

// Randomize line width at fragment.
float get_line_width(vec2 p, float s) {
    p /= blockSize;
    float w = 0.0;
    float intensity = 1.0;
    for (int i = 0; i < 3; i++) {
        w = mix(w, noise(p, s), intensity);
        p /= 2.0;
        intensity /= 2.0;
    }

    return mix(maxLineWidth, minLineWidth, w);
}

// Checks for neighboring pixels.
float compute_outline(vec2 size, sampler2D tex, vec2 uv) {
    float res = 0.0;
    for (float i = -1.0; i < 2.0; i += 2.0) {
        res += get_alpha(tex, uv + vec2(i * size.x, 0.0));
        res += get_alpha(tex, uv + vec2(0.0, i * size.y));
        for (float j = -1.0; j < 2.0; j += 2.0) {
            res += get_alpha(tex, uv + vec2(i * size.x, j * size.y));
            res += get_alpha(tex, uv + vec2(i * size.x, j * size.y * 0.5));
        }
    }
    return res;
}

// Checks for neighboring pixels.
bool in_range(vec2 size, sampler2D tex, vec2 uv) {
    for (float i = -1.0; i < 2.0; i += 2.0) {
        if (get_alpha(tex, uv + vec2(i * size.x, 0.0)) > 0.0) {return true;};
        if (get_alpha(tex, uv + vec2(0.0, i * size.y)) > 0.0) {return true;};
        for (float j = -1.0; j < 2.0; j += 2.0) {
            if (get_alpha(tex, uv + vec2(i * size.x, j * size.y)) > 0.0) {return true;};
            if (get_alpha(tex, uv + vec2(i * size.x, j * size.y * 0.5)) > 0.0) {return true;};
        }
    }
    return false;
}

// Get's closes pixel.
float get_distance(vec2 maxDistance, sampler2D tex, vec2 uv) {
    for (int i = 1; i < 100; i++) {
        vec2 actualDistance = float(i) / float(gradientResolution) * maxDistance;
        if (in_range(actualDistance, tex, uv)) {
            return float(i) / float(gradientResolution);
        }
        if (i >= gradientResolution) {
            return 1.0;
        }
    }
}

void main() {
    if (max(maxLineWidth, minLineWidth) > 0.0) {
        vec2 TEXTURE_PIXEL_SIZE = 1.0 / vOutputFrame.ba;
        vec2 edge = TEXTURE_PIXEL_SIZE * max(maxLineWidth, minLineWidth) * 2.0;

        // Apply outline.
        vec4 newColor = texture2D(uSampler, vTextureCoord);
        if (newColor.a <= tolerance || border(vTextureCoord)) {
            // Correct angle to start at right and convert to radians.
            float radiansAngle = radians(angle + 180.0);
            // Make a vector out of the angle.
            vec2 vector = vec2(cos(radiansAngle), sin(radiansAngle));
            float timeStep = floor(time * speed);
            vec2 size = TEXTURE_PIXEL_SIZE;
            size *= get_line_width(vTextureCoord / TEXTURE_PIXEL_SIZE, timeStep);
            vec4 textureColor = texture2D(scrollingTexture, fract(vTextureCoord / textureScale + vector * textureSpeed * time));
            vec4 actualColor = texture2D(color, vec2(get_distance(edge / 2.0 + 0.01, uSampler, vTextureCoord)));
            vec4 finalColor = step(1.0 - tolerance, in_range(size, uSampler, vTextureCoord) ? 1.0 : 0.0) * mix(actualColor, textureColor, textureStrength);
            newColor = finalColor;
        }
        gl_FragColor = newColor;
    } else {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}
