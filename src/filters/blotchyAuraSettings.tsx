import { useEffect, useState } from "react";
import { AggregationColor } from "antd/es/color-picker/color";
import { ColorPicker, Flex } from "antd";
import { SliderInput } from "../components/sliderInput.tsx";

type BasicOutlineSettingsProps = {
  update(uniforms: Record<string, string | number | number[] | boolean>): void;
};

export const BlotchyAuraSettings = ({ update }: BasicOutlineSettingsProps) => {
  const [color, setColor] = useState(new AggregationColor("#ffffff"));
  const [maxLineWidth, setMaxLineWidth] = useState(10);
  const [minLineWidth, setMinLineWidth] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [blockSize, setBlockSize] = useState(20);
  const [tolerance, setTolerance] = useState(0);

  useEffect(() => {
    const parts = color.toRgb();

    update({
      color: [parts.r / 255, parts.g / 255, parts.b / 255, 1 / parts.a],
      maxLineWidth,
      minLineWidth,
      speed,
      blockSize,
      tolerance,
    });
  }, [blockSize, color, maxLineWidth, minLineWidth, speed, tolerance, update]);

  return (
    <>
      <Flex vertical>
        Color:
        <div>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </Flex>

      <SliderInput
        title={"minLineWidth"}
        value={minLineWidth}
        onChange={setMinLineWidth}
        min={0}
        max={100}
      />

      <SliderInput
        title={"maxLineWidth"}
        value={maxLineWidth}
        onChange={setMaxLineWidth}
        min={0}
        max={100}
      />

      <SliderInput
        title={"speed"}
        value={speed}
        onChange={setSpeed}
        min={0}
        max={10}
      />

      <SliderInput
        title={"blockSize"}
        value={blockSize}
        onChange={setBlockSize}
        min={0.001}
        max={100}
      />

      <SliderInput
        title={"Tolerance"}
        value={tolerance}
        onChange={setTolerance}
        min={0}
        max={0.999}
        step={0.05}
      />
    </>
  );
};
