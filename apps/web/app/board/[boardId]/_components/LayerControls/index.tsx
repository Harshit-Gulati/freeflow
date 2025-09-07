import { useCanvasContext } from "../../context";
import { getLayerControlsPosition } from "@/lib/canvas/ui-utilities";
import { ColorPicker } from "./color-picker";
import { Separator } from "./separator";
import { MiscControls } from "./misc-controls";

export const LayerControls = () => {
  const { selectionBounds, isResizing, isDragging, canvasRect } =
    useCanvasContext();

  if (!selectionBounds || isResizing || isDragging || !canvasRect) return null;

  const { top, left, width, height } = getLayerControlsPosition(
    canvasRect,
    selectionBounds
  );

  return (
    <div
      style={{
        top,
        left,
        width,
        height,
        transition: "top 0.2s, left 0.2s",
        zIndex: 1000,
      }}
      className="absolute bg-unit-bg2 rounded-md shadow-md p-1 flex flex-col gap-1 select-none"
    >
      <ColorPicker />
      <Separator />
      <MiscControls />
    </div>
  );
};
