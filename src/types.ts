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
};
