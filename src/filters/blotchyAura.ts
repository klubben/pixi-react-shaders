import { Filter, Ticker } from "pixi.js";
import fragmentShader from "./blotchyAura.frag";
import vertexShader from "./default.vert";

type Uniforms = {
  color?: [number, number, number, number];
  maxLineWidth?: number;
  minLineWidth?: number;
  speed?: number;
  blockSize?: number;
  tolerance?: number;
};

export class BlotchyAura extends Filter {
  constructor(uniforms?: Uniforms) {
    super(vertexShader, fragmentShader);
    this.resolution = 3;
    this.padding = 40;
    this.uniforms.time = 0;

    this.uniforms.color = new Float32Array([1, 1, 1, 1]);
    this.uniforms.maxLineWidth = 10;
    this.uniforms.minLineWidth = 5;
    this.uniforms.speed = 1;
    this.uniforms.blockSize = 20;
    this.uniforms.tolerance = 0;

    if (uniforms) {
      this.updateUniforms(uniforms);
    }

    this.update = this.update.bind(this);
    this.updateUniforms = this.updateUniforms.bind(this);
    Ticker.shared.add(this.update);
  }

  updateUniforms(uniforms: Uniforms) {
    this.uniforms.maxLineWidth =
      uniforms.maxLineWidth ?? this.uniforms.maxLineWidth;
    this.uniforms.minLineWidth =
      uniforms.minLineWidth ?? this.uniforms.minLineWidth;
    this.uniforms.speed = uniforms.speed ?? this.uniforms.speed;
    this.uniforms.blockSize = uniforms.blockSize ?? this.uniforms.blockSize;
    this.uniforms.color = uniforms.color ?? this.uniforms.color;
    this.uniforms.tolerance = uniforms.tolerance ?? this.uniforms.tolerance;
  }

  public printUniforms() {
    console.log(this.uniforms);
  }

  private update(delta: number) {
    this.uniforms.time += delta / 10;
  }
}
