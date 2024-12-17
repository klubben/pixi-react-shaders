export enum UniformType {
  Number = "number",
  Boolean = "boolean",
  Color = "color",
}

export type UniformDict = Record<string, number | number[] | boolean>;

export type FilterConfig = {
  shader: string;
  uniforms: Record<
    string,
    {
      type: UniformType;
      default: number | number[] | boolean;
      range?: [number, number];
      step?: number;
    }
  >;
};
