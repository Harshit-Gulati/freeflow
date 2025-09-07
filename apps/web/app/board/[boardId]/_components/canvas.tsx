"use client";

import { useCanvas } from "./hooks/use-canvas";

export const Canvas = () => {
  const { canvasRef, onMouseDown, onMouseMove, onMouseUp } = useCanvas();

  return (
    <canvas
      ref={canvasRef}
      className="h-screen w-screen"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    />
  );
};
