import { ColorPicker, Flex } from "antd";
import { aggregationColorToArray, arrayToAggregationColor } from "../utils.ts";
import { UniformDict } from "../types.ts";
import { useCallback, useState } from "react";
import { AggregationColor } from "antd/es/color-picker/color";

type Props = {
  update: (uniforms: UniformDict) => void;
  name: string;
  defaultValue: [number, number, number, number];
};

export const Color = ({ name, update, defaultValue }: Props) => {
  const [color, setColor] = useState(
    new AggregationColor(arrayToAggregationColor(defaultValue)),
  );

  const handleChange = useCallback(
    (color: AggregationColor) => {
      setColor(color);
      update({
        [name]: aggregationColorToArray(color),
      });
    },
    [name, update],
  );

  return (
    <Flex vertical>
      {name}:
      <div>
        <ColorPicker value={color} onChange={handleChange} />
      </div>
    </Flex>
  );
};
