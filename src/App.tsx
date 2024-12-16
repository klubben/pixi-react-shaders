import "./App.css";
import { Sprite, Stage } from "@pixi/react";
import { BasicOutline } from "./filters/basicOutline.ts";
import { Flex, Select } from "antd";
import { useMemo, useState } from "react";
import { BasicOutlineSettings } from "./filters/basicOutlineSettings.tsx";
import { BlotchyAura } from "./filters/blotchyAura.ts";
import { BlotchyAuraSettings } from "./filters/blotchyAuraSettings.tsx";
import { Fps } from "./components/fps.tsx";

const filters = {
  BasicOutline: {
    class: BasicOutline,
    settings: BasicOutlineSettings,
  },
  BlotchyAura: {
    class: BlotchyAura,
    settings: BlotchyAuraSettings,
  },
};

const App = () => {
  const front = "/card-front.png";
  const creature = "/creature.png";
  const [currentFilter, setCurrentFilter] =
    useState<keyof typeof filters>("BasicOutline");

  const filter = useMemo(
    () => new filters[currentFilter].class(),
    [currentFilter],
  );

  const Settings = filters[currentFilter].settings;

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

        <Settings update={filter.updateUniforms} />
      </Flex>
    </Flex>
  );
};

export default App;
