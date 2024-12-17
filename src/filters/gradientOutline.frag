varying vec2 vTextureCoord;
varying vec4 vOutputFrame;
uniform float time;
uniform sampler2D uSampler;

// The outline color. GradientTexture1D is recommended. : source_color
uniform sampler2D color;
// The resolution for the gradient. Higher numbers will result in smoother but more expensive passes. : hint_range(1, 30) = 10
uniform int gradientResolution;
// Outline thickness. : hint_range(0.0, 100.0) = 1.0
uniform float thickness;
// Used to compensate for alpha values. : hint_range(0.0, 0.999) = 0.0
uniform float tolerance;
// If on will draw at diagonals. Off is mainly for pixel art but you do you.
uniform bool diagonals;
// If diagonals are checked will check for half pixels so it rounds the outline a bit more.
uniform bool rounded;


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

// Checks for neighboring pixels.
bool in_range(vec2 size, sampler2D tex, vec2 uv) {
    for (float i = -1.0; i < 2.0; i += 2.0) {
        if (get_alpha(tex, uv + vec2(i * size.x, 0.0)) > 0.0) {return true;};
        if (get_alpha(tex, uv + vec2(0.0, i * size.y)) > 0.0) {return true;};
        if (diagonals) {
            for (float j = -1.0; j < 2.0; j += 2.0) {
                if (get_alpha(tex, uv + vec2(i * size.x, j * size.y)) > 0.0) {return true;};
                if (rounded) {
                    if (get_alpha(tex, uv + vec2(i * size.x, j * size.y * 0.5)) > 0.0) {return true;};
                }
            }
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
    if (thickness > 0.0) {
        vec2 TEXTURE_PIXEL_SIZE = 1.0 / vOutputFrame.ba;
        // Correct image size to for outline in frame.
        //        vec2 uv = UV;
        //        uv -= vec2(0.5);
        vec2 edge = TEXTURE_PIXEL_SIZE * thickness * 2.0;
        //        uv = uv + uv * edge;
        //        uv += vec2(0.5);

        // Apply outline.
        vec4 newColor = texture2D(uSampler, vTextureCoord);
        if (newColor.a <= tolerance || border(vTextureCoord)) {
            vec4 finalColor = step(1.0 - tolerance, in_range(edge / 2.0, uSampler, vTextureCoord) ? 1.0 : 0.0) * texture2D(color, vec2(get_distance(edge / 2.0 + 0.001, uSampler, vTextureCoord)));
            newColor = finalColor;
        }
        gl_FragColor = newColor;
    } else {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}