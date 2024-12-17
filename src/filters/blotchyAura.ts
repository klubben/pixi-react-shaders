import { FilterConfig, UniformType } from "../types.ts";
import blotchyAuraShader from "./blotchyAura.frag";

export const blotchyAura: FilterConfig = {
  shader: blotchyAuraShader,
  uniforms: {
    color: { type: UniformType.Color, default: [1, 0, 0, 1] },
    maxLineWidth: { type: UniformType.Number, default: 10, range: [0, 100] },
    minLineWidth: { type: UniformType.Number, default: 5, range: [0, 100] },
    speed: { type: UniformType.Number, default: 1, range: [0, 10] },
    blockSize: { type: UniformType.Number, default: 20, range: [0.001, 100] },
    tolerance: {
      type: UniformType.Number,
      default: 0,
      range: [0, 0.999],
      step: 0.05,
    },
  },
};
