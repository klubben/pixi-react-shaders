import { FilterConfig, imageMap, UniformDict } from "../types.ts";
import vertexShader from "./default.vert";
import { Filter, Resource, Texture, Ticker } from "pixi.js";

const textures: Record<string, Texture<Resource>> = {};

export class CustomFilter extends Filter {
  constructor({ shader, uniforms }: FilterConfig) {
    super(vertexShader, shader);

    if (!this.program.fragmentSrc.includes("#version 300 es")) {
      this.program.vertexSrc = "#version 300 es \n" + this.program.vertexSrc;
      this.program.fragmentSrc =
        "#version 300 es \n" + this.program.fragmentSrc;
    }

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
        if (typeof uniforms[key] === "string") {
          if (!textures[uniforms[key]]) {
            textures[uniforms[key]] = Texture.from(
              imageMap[uniforms[key] as keyof typeof imageMap],
            );
          }

          this.uniforms[key] = textures[uniforms[key]];
        } else {
          this.uniforms[key] = uniforms[key];
        }
      }
    }
  }

  private update(delta: number) {
    this.uniforms.time += delta / 10;
  }
}
