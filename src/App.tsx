import "./App.css";
import { Sprite, Stage } from "@pixi/react";
import { Flex, Select } from "antd";
import { useMemo, useState } from "react";
import { Fps } from "./components/fps.tsx";
import { FilterConfig, UniformType } from "./types.ts";

import blotchyAura from "./filters/blotchyAura.frag";
import basicOutline from "./filters/basicOutline.frag";
import { CustomFilter } from "./filters/customFilter.ts";
import { Settings } from "./components/settings.tsx";

const filters: Record<string, FilterConfig> = {
  BasicOutline: {
    shader: basicOutline,
    uniforms: {
      color: { type: UniformType.Color, default: [1, 0, 0, 1] },
      thickness: { type: UniformType.Number, default: 20, range: [0, 100] },
      tolerance: {
        type: UniformType.Number,
        default: 0,
        range: [0, 1],
        step: 0.05,
      },
      diagonals: { type: UniformType.Boolean, default: true },
      rounded: { type: UniformType.Boolean, default: true },
    },
  },
  BlotchyAura: {
    shader: blotchyAura,
    uniforms: {
      color: { type: UniformType.Color, default: [1, 0, 0, 1] },
      maxLineWidth: { type: UniformType.Number, default: 10, range: [0, 100] },
      minLineWidth: { type: UniformType.Number, default: 5, range: [0, 100] },
      speed: { type: UniformType.Number, default: 1, range: [0, 10] },
      blockSize: { type: UniformType.Number, default: 20, range: [0.001, 100] },
      tolerance: {
        type: UniformType.Number,
        default: 0,
        range: [0, 0.999],
        step: 0.05,
      },
    },
  },
};

const App = () => {
  const front = "/card-front.png";
  const creature = "/creature.png";
  const [currentFilter, setCurrentFilter] =
    useState<keyof typeof filters>("BasicOutline");

  const filter = useMemo(() => {
    console.log(currentFilter);
    return new CustomFilter(filters[currentFilter]);
  }, [currentFilter]);

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
        <Fps />

        <Select
          defaultValue="BasicOutline"
          onChange={setCurrentFilter}
          options={Object.keys(filters).map((key) => ({
            label: key,
            value: key,
          }))}
        />

        <Settings
          update={filter.updateUniforms}
          uniforms={filters[currentFilter].uniforms}
        />
      </Flex>
    </Flex>
  );
};

export default App;
