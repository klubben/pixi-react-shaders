import { Filter, Ticker } from "pixi.js";
import fragmentShader from "./basicOutline.frag";
import vertexShader from "./default.vert";

type Uniforms = {
  color?: [number, number, number, number];
  thickness?: number;
  tolerance?: number;
  diagonals?: boolean;
  rounded?: boolean;
};

export class BasicOutline extends Filter {
  constructor(uniforms?: Uniforms) {
    super(vertexShader, fragmentShader);
    this.resolution = 3;
    this.padding = 40;
    this.uniforms.time = 0;

    this.uniforms.color = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    this.uniforms.thickness = 20;
    this.uniforms.tolerance = 0;
    this.uniforms.diagonals = true;
    this.uniforms.rounded = true;

    if (uniforms) {
      this.updateUniforms(uniforms);
    }

    this.update = this.update.bind(this);
    Ticker.shared.add(this.update);
  }

  updateUniforms(uniforms: Uniforms) {
    if (uniforms.color !== undefined) {
      this.uniforms.color = new Float32Array(uniforms.color);
    }

    if (uniforms.thickness !== undefined) {
      this.uniforms.thickness = uniforms.thickness;
    }

    if (uniforms.tolerance !== undefined) {
      this.uniforms.tolerance = uniforms.tolerance;
    }

    if (uniforms.diagonals !== undefined) {
      this.uniforms.diagonals = uniforms.diagonals;
    }

    if (uniforms.rounded !== undefined) {
      this.uniforms.rounded = uniforms.rounded;
    }
  }

  public printUniforms() {
    console.log(this.uniforms);
  }

  private update(delta: number) {
    this.uniforms.time += delta / 80;
  }
}
