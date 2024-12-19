import { FilterConfig, UniformType } from "../types.ts";
import circleShader from "./circle.frag";

export const circle: FilterConfig = {
  shader: circleShader,
  uniforms: {
    starting_colour: { type: UniformType.Color, default: [1, 1, 0, 1] },
    ending_colour: { type: UniformType.Color, default: [0, 1, 0, 1] },
    gradient_texture: { type: UniformType.Texture, default: "outline3" },
    max_line_width: { type: UniformType.Number, default: 12, range: [0, 100] },
    min_line_width: { type: UniformType.Number, default: 4, range: [0, 100] },
    freq: { type: UniformType.Number, default: 44, range: [0, 100] },
    block_size: { type: UniformType.Number, default: 1, range: [0, 10] },
  },
};
