in vec2 aVertexPosition;

uniform mat3 projectionMatrix;

out vec2 vTextureCoord;
out vec4 vOutputFrame;
out vec4 vInputSize;
out vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition(void)
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord(void)
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vOutputFrame = outputFrame;
    vInputSize = inputSize;
    vFilterCoord = filterTextureCoord() * inputSize.xy / outputFrame.zw;
}