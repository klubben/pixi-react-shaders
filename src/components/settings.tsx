import { FilterConfig, UniformDict, UniformType } from "../types.ts";
import { Color } from "./color.tsx";
import { BooleanInput } from "./booleanInput.tsx";
import { SliderInput } from "./sliderInput.tsx";
import { Texture } from "./texture.tsx";

type Props = {
  update: (uniforms: UniformDict) => void;
  uniforms: FilterConfig["uniforms"];
};

export const Settings = ({ update, uniforms }: Props) => {
  return (
    <>
      {Object.entries(uniforms).map(([name, uniform]) => {
        switch (uniform.type) {
          case UniformType.Color: {
            return (
              <Color
                key={name}
                name={name}
                defaultValue={
                  uniform.default as [number, number, number, number]
                }
                update={update}
              />
            );
          }

          case UniformType.Boolean: {
            return (
              <BooleanInput
                key={name}
                name={name}
                defaultChecked={uniform.default as boolean}
                update={update}
              />
            );
          }

          case UniformType.Number: {
            return (
              <SliderInput
                key={name}
                name={name}
                defaultValue={uniform.default as number}
                update={update}
                min={uniform.range?.[0]}
                max={uniform.range?.[1]}
                step={uniform.step}
              />
            );
          }

          case UniformType.Texture: {
            return (
              <Texture
                key={name}
                name={name}
                update={update}
                defaultValue={uniform.default as string}
              />
            );
          }
        }
      })}
    </>
  );
};
