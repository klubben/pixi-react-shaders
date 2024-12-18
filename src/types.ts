export enum UniformType {
  Number = "number",
  Boolean = "boolean",
  Color = "color",
  Texture = "texture",
}

export type UniformDict = Record<string, number | number[] | boolean | string>;

export type FilterConfig = {
  shader: string;
  uniforms: Record<
    string,
    {
      type: UniformType;
      default: number | number[] | boolean | string;
      range?: [number, number];
      step?: number;
    }
  >;
};

export const imageMap = {
  gradient: "/gradient.png",
  gradient2: "/gradient2.png",
  perlin: "/perlin.png",
  random: "https://picsum.photos/256/256",
  outline: "/outline.png",
  outline2: "/outline2.png",
  checkers: "/checkers.png",
  outline3: "/outline3.png",
  outline3_marked: "/outline3.png",
};
