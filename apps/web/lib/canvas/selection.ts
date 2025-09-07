import { Point, Shape, Shapes, TextShape } from "@/types/canvas";
import { HANDLE_SIZE } from "./constants";
import {
  isInsideSelectionBox,
  isPointInEllipse,
  isPointOnDrawing,
} from "./geometry";
import { getXYHW } from "./shapeBounds";

export const isInHandle = ({
  clickPoint,
  cornerPoint,
}: {
  clickPoint: Point;
  cornerPoint: Point;
}) => {
  const half = HANDLE_SIZE / 2;
  return (
    clickPoint.x >= cornerPoint.x - half &&
    clickPoint.x <= cornerPoint.x + half &&
    clickPoint.y >= cornerPoint.y - half &&
    clickPoint.y <= cornerPoint.y + half
  );
};

export const handleTextDoubleClick = (
  shapes: Record<string, Shape>,
  clickPoint: Point
): { found: false } | { found: true; shape: TextShape; id: string } => {
  Object.entries(shapes).forEach(([id, shape]) => {
    if (
      shape.type === Shapes.Text &&
      isInsideSelectionBox({ clickPoint, boxDimensions: shape })
    ) {
      return { found: true, shape, id };
    }
  });
  return { found: false };
};

export const getSelectedShapes = (
  clickPoint: Point,
  shapes: Record<string, Shape>,
  e: React.MouseEvent,
  currentlySelected: Set<string>
): Set<string> => {
  const res: Set<string> = e.shiftKey ? new Set(currentlySelected) : new Set();

  for (const [id, shape] of Object.entries(shapes)) {
    let isSelected = false;

    switch (shape.type) {
      case Shapes.Rectangle:
      case Shapes.Text:
        isSelected = isInsideSelectionBox({ clickPoint, boxDimensions: shape });
        break;
      case Shapes.Ellipse:
        isSelected = isPointInEllipse(clickPoint, shape);
        break;
      case Shapes.Arrow:
        isSelected = isInsideSelectionBox({
          clickPoint,
          boxDimensions: getXYHW(shape),
        });
        break;
      case Shapes.Pencil:
        isSelected = isPointOnDrawing(clickPoint, shape.points);
        break;
    }

    if (isSelected) {
      res.add(id);
    }
  }

  return res;
};
