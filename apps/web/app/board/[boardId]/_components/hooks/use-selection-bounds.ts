import { getMinMax } from "@/lib/canvas/shapeBounds";
import { Shape } from "@/types/canvas";

export const useSelectionBounds = (
  shapes: Record<string, Shape>,
  selectedShapes: Set<string>
) => {
  if (selectedShapes.size === 0) return null;

  const selectedShapesArray = [...selectedShapes].map((id) => shapes[id]!);

  const { minX, maxX, minY, maxY } = getMinMax(selectedShapesArray);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};
