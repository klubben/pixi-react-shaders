precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vOutputFrame;
uniform float time;
uniform sampler2D uSampler;

uniform vec4 color;
uniform float thickness;
uniform float tolerance;
uniform bool diagonals;
uniform bool rounded;

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

// Checks for neighboring pixels.
float in_range(vec2 size, sampler2D tex, vec2 uv) {
    float res = 0.0;
    for (float i = -1.0; i < 2.0; i += 2.0) {
        res += get_alpha(tex, uv + vec2(i * size.x, 0.0));
        res += get_alpha(tex, uv + vec2(0.0, i * size.y));
        if (diagonals) {
            for (float j = -1.0; j < 2.0; j += 2.0) {
                res += get_alpha(tex, uv + vec2(i * size.x, j * size.y));
                if (rounded) {
                    res += get_alpha(tex, uv + vec2(i * size.x, j * size.y * 0.5));
                }
            }
        }
    }
    return res;
}

void main() {
    if (thickness > 0.0) {
        vec2 uv = vTextureCoord;

        // Apply outline.
        vec4 newColor = texture2D(uSampler, uv);
        if (newColor.a == 0.0 || border(uv)) {
            float outline = in_range(1.0 / vOutputFrame.ba * thickness, uSampler, uv);
            vec4 finalColor = step(1.0 - tolerance, outline) * color;
            newColor = finalColor;
        }
        gl_FragColor = newColor;
    } else {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}