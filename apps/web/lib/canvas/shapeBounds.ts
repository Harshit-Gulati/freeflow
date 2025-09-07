import { CornerMap, Point, Shape, Shapes, XYHW } from "@/types/canvas";

export const getXYHW = (shape: Shape): XYHW => {
  switch (shape.type) {
    case Shapes.Ellipse:
    case Shapes.Text:
    case Shapes.Rectangle:
      return {
        x: shape.x,
        y: shape.y,
        width: shape.width,
        height: shape.height,
      };
    case Shapes.Arrow:
      return {
        x: Math.min(shape.fromX, shape.toX) - 10,
        y: Math.min(shape.fromY, shape.toY) - 10,
        width: Math.abs(shape.toX - shape.fromX) + 20,
        height: Math.abs(shape.toY - shape.fromY) + 20,
      };
    case Shapes.Pencil:
      let minX = Number.MAX_SAFE_INTEGER,
        minY = Number.MAX_SAFE_INTEGER,
        maxX = Number.MIN_SAFE_INTEGER,
        maxY = Number.MIN_SAFE_INTEGER;
      shape.points.forEach((point: Point) => {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
      });
      return {
        x: minX - 5,
        y: minY - 5,
        width: maxX - minX + 10,
        height: maxY - minY + 10,
      };
  }
};

export const getMinMax = (selectedShapes: Shape[]) => {
  let minX = Number.MAX_SAFE_INTEGER,
    minY = Number.MAX_SAFE_INTEGER,
    maxX = Number.MIN_SAFE_INTEGER,
    maxY = Number.MIN_SAFE_INTEGER;

  for (const shape of selectedShapes) {
    const { x, y, width, height } = getXYHW(shape);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxY = Math.max(y + height, maxY);
    maxX = Math.max(x + width, maxX);
  }

  return { maxX, minX, maxY, minY };
};

export const getCorners = (
  selectionBox: Point & { width: number; height: number }
): CornerMap => {
  const padding = 5;
  return {
    "top-left": { x: selectionBox.x - padding, y: selectionBox.y - padding },
    "top-right": {
      x: selectionBox.x + selectionBox.width + padding,
      y: selectionBox.y - padding,
    },
    "bottom-left": {
      x: selectionBox.x - padding,
      y: selectionBox.y + selectionBox.height + padding,
    },
    "bottom-right": {
      x: selectionBox.x + selectionBox.width + padding,
      y: selectionBox.y + selectionBox.height + padding,
    },
  };
};
