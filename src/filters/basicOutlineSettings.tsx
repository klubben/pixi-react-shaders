import { useEffect, useState } from "react";
import { AggregationColor } from "antd/es/color-picker/color";
import { ColorPicker, Flex } from "antd";
import { SliderInput } from "../components/sliderInput.tsx";
import { BooleanInput } from "../components/booleanInput.tsx";

type BasicOutlineSettingsProps = {
  update(uniforms: Record<string, string | number | number[] | boolean>): void;
};

export const BasicOutlineSettings = ({ update }: BasicOutlineSettingsProps) => {
  const [color, setColor] = useState(new AggregationColor("#ffffff"));
  const [thickness, setThickness] = useState(20);
  const [tolerance, setTolerance] = useState(0);
  const [diagonals, setDiagonals] = useState(true);
  const [rounded, setRounded] = useState(true);

  useEffect(() => {
    const parts = color.toRgb();

    update({
      color: [parts.r / 255, parts.g / 255, parts.b / 255, 1 / parts.a],
      thickness,
      tolerance,
      diagonals,
      rounded,
    });
  }, [color, diagonals, update, rounded, thickness, tolerance]);

  return (
    <>
      <Flex vertical>
        Color:
        <div>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </Flex>

      <SliderInput
        title={"Thickness"}
        value={thickness}
        onChange={setThickness}
        min={0}
        max={100}
      />

      <SliderInput
        title={"Tolerance"}
        value={tolerance}
        onChange={setTolerance}
        min={0}
        max={1}
        step={0.05}
      />

      <BooleanInput
        title={"Diagonals"}
        checked={diagonals}
        onChange={setDiagonals}
      />

      <BooleanInput title={"Rounded"} checked={rounded} onChange={setRounded} />
    </>
  );
};
