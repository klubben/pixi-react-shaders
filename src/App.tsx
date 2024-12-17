import "./App.css";
import { Sprite, Stage } from "@pixi/react";
import { Flex, Select } from "antd";
import { useMemo, useState } from "react";
import { Fps } from "./components/fps.tsx";
import { FilterConfig } from "./types.ts";
import { CustomFilter } from "./filters/customFilter.ts";
import { Settings } from "./components/settings.tsx";
import { basicOutline } from "./filters/basicOutline.ts";
import { blotchyAura } from "./filters/blotchyAura.ts";
import { gradientOutline } from "./filters/gradientOutline.ts";
import { allInOne } from "./filters/allInOne.ts";
import { jigglyOutline } from "./filters/jigglyOutline.ts";

const filters: Record<string, FilterConfig> = {
  BasicOutline: basicOutline,
  BlotchyAura: blotchyAura,
  GradientOutline: gradientOutline,
  AllInOne: allInOne,
  JigglyOutline: jigglyOutline,
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
