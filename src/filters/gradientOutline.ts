import { FilterConfig, UniformType } from "../types.ts";
import gradientOutlineShader from "./gradientOutline.frag";

export const gradientOutline: FilterConfig = {
  shader: gradientOutlineShader,
  uniforms: {
    color: { type: UniformType.Texture, default: "gradient" },
    gradientResolution: {
      type: UniformType.Number,
      default: 10,
      range: [0, 100],
    },
    thickness: { type: UniformType.Number, default: 20, range: [0, 100] },
    tolerance: {
      type: UniformType.Number,
      default: 0,
      range: [0, 0.999],
      step: 0.05,
    },
    diagonals: { type: UniformType.Boolean, default: true },
    rounded: { type: UniformType.Boolean, default: true },
  },
};
