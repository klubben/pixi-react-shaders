import { FilterConfig, UniformType } from "../types.ts";
import basicOutlineShader from "./basicOutline.frag";

export const basicOutline: FilterConfig = {
  shader: basicOutlineShader,
  uniforms: {
    color: { type: UniformType.Color, default: [1, 0, 0, 1] },
    thickness: { type: UniformType.Number, default: 20, range: [0, 100] },
    tolerance: {
      type: UniformType.Number,
      default: 0,
      range: [0, 1],
      step: 0.05,
    },
    diagonals: { type: UniformType.Boolean, default: true },
    rounded: { type: UniformType.Boolean, default: true },
  },
};
