import { FilterConfig, UniformType } from "../types.ts";
import allInOneShader from "./allInOne.frag";

export const allInOne: FilterConfig = {
  shader: allInOneShader,
  uniforms: {
    color: { type: UniformType.Texture, default: "gradient" },
    scrollingTexture: { type: UniformType.Texture, default: "perlin" },
    angle: { type: UniformType.Number, default: 45, range: [0, 360] },
    textureSpeed: { type: UniformType.Number, default: 0.1, range: [-10, 10] },
    textureStrength: {
      type: UniformType.Number,
      default: 0.5,
      range: [0, 1],
      step: 0.1,
    },
    maxLineWidth: { type: UniformType.Number, default: 10, range: [0, 100] },
    minLineWidth: { type: UniformType.Number, default: 5, range: [0, 100] },
    speed: { type: UniformType.Number, default: 1, range: [0, 10] },
    blockSize: { type: UniformType.Number, default: 20, range: [0.001, 100] },
    gradientResolution: {
      type: UniformType.Number,
      default: 10,
      range: [0, 100],
    },
    tolerance: {
      type: UniformType.Number,
      default: 0,
      range: [0, 0.999],
      step: 0.05,
    },
  },
};
