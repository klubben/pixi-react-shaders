import { Flex, InputNumber, Slider } from "antd";
import { UniformDict } from "../types.ts";
import { useState } from "react";

type SliderInputProps = {
  name: string;
  defaultValue: number;
  update: (uniforms: UniformDict) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const SliderInput = ({
  name,
  defaultValue,
  update,
  min,
  max,
  step,
}: SliderInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (value: number) => {
    setValue(value);
    update({
      [name]: value,
    });
  };

  return (
    <Flex vertical>
      {name}:
      <Flex gap={3}>
        <Slider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          style={{ flex: 1 }}
        />
        <InputNumber
          value={value}
          onChange={(e) => onChange(e ?? 0)}
          min={min}
          max={max}
        />
      </Flex>
    </Flex>
  );
};
