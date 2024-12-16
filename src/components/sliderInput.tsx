import { Flex, InputNumber, Slider } from "antd";

type SliderInputProps = {
  title: string;
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const SliderInput = ({
  title,
  value,
  onChange,
  min,
  max,
  step,
}: SliderInputProps) => {
  return (
    <Flex vertical>
      {title}:
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
          onChange={(e) => onChange?.(e ?? 0)}
          min={min}
          max={max}
        />
      </Flex>
    </Flex>
  );
};
