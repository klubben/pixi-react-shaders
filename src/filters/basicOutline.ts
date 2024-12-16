import { Filter, Ticker } from "pixi.js";
import fragmentShader from "./basicOutline.frag";

export class BasicOutline extends Filter {
  constructor() {
    super(undefined, fragmentShader);
    this.resolution = 3;
    this.uniforms.time = 0;
    this.padding = 20;

    this.update = this.update.bind(this);
    Ticker.shared.add(this.update);
  }

  private update(delta: number) {
    this.uniforms.time += delta / 80;
  }
}
