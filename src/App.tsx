import "./App.css";
import { Sprite, Stage } from "@pixi/react";
import { BasicOutline } from "./filters/basicOutline.ts";
import { ColorPicker, Flex } from "antd";
import { useEffect, useMemo, useState } from "react";
import { AggregationColor } from "antd/es/color-picker/color";
import { SliderInput } from "./components/sliderInput.tsx";
import { BooleanInput } from "./components/booleanInput.tsx";

const App = () => {
  const front = "/card-front.png";
  const creature = "/creature.png";

  const filter = useMemo(() => new BasicOutline(), []);

  const [color, setColor] = useState(new AggregationColor("#ffffff"));
  const [thickness, setThickness] = useState(20);
  const [tolerance, setTolerance] = useState(0);
  const [diagonals, setDiagonals] = useState(true);
  const [rounded, setRounded] = useState(true);

  useEffect(() => {
    const parts = color.toRgb();

    filter.updateUniforms({
      color: [parts.r / 255, parts.g / 255, parts.b / 255, 1 / parts.a],
      thickness,
      tolerance,
      diagonals,
      rounded,
    });
  }, [color, diagonals, filter, rounded, thickness, tolerance]);

  return (
    <Flex gap={20}>
      <Stage width={1024} height={768} options={{ background: 0x1099bb }}>
        <Sprite
          image={front}
          x={100}
          y={100}
          width={300}
          height={300 * (1090 / 769)}
          filters={[filter]}
          interactive={true}
          pointerdown={() => filter.printUniforms()}
        />
        <Sprite
          image={creature}
          x={500}
          y={100}
          width={300}
          height={300 * (659 / 548)}
          filters={[filter]}
        />
      </Stage>
      <Flex vertical gap="middle" style={{ width: "400px", flex: "1 1 auto" }}>
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

        <BooleanInput
          title={"Rounded"}
          checked={rounded}
          onChange={setRounded}
        />
      </Flex>
    </Flex>
  );
};

export default App;
