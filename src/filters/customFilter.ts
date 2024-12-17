import { FilterConfig, UniformDict } from "../types.ts";
import vertexShader from "./default.vert";
import { Filter, Ticker } from "pixi.js";

export class CustomFilter extends Filter {
  constructor({ shader, uniforms }: FilterConfig) {
    super(vertexShader, shader);

    this.updateUniforms(
      Object.fromEntries(
        Object.entries(uniforms).map(([key, value]) => [key, value.default]),
      ),
    );

    this.update = this.update.bind(this);
    this.updateUniforms = this.updateUniforms.bind(this);
    this.uniforms.time = 0;
    this.padding = 40;

    Ticker.shared.add(this.update);
  }

  destroy() {
    super.destroy();

    Ticker.shared.remove(this.update);
  }

  updateUniforms(uniforms: UniformDict) {
    for (const key in uniforms) {
      if (uniforms[key] !== undefined) {
        this.uniforms[key] = uniforms[key];
      }
    }
  }

  private update(delta: number) {
    this.uniforms.time += delta / 10;
  }
}
