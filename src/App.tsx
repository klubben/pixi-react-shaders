import "./App.css";
import { Sprite, Stage } from "@pixi/react";
import { BasicOutline } from "./filters/basicOutline.ts";

const App = () => {
  const front = "/card-front.png";
  const creature = "/creature.png";

  const filter = new BasicOutline();

  return (
    <Stage width={1024} height={768} options={{ background: 0x1099bb }}>
      <Sprite
        image={front}
        x={100}
        y={100}
        width={300}
        height={300 * (1090 / 769)}
        filters={[filter]}
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
  );
};

export default App;
