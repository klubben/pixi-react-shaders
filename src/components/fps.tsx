import { useCallback, useEffect, useState } from "react";
import { Ticker } from "pixi.js";

export const Fps = () => {
  const [fps, setFps] = useState(0);

  const updateFps = useCallback(() => {
    const fps = Math.round(Ticker.shared.FPS);
    setFps(fps);
  }, []);

  useEffect(() => {
    Ticker.shared.add(updateFps);
    return () => {
      Ticker.shared.remove(updateFps);
    };
  }, [updateFps]);
  return <div>{fps}</div>;
};
