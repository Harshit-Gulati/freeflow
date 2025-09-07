import { Point, Shape, Shapes } from "@/types/canvas";

export const initializeDrag = (
  shapes: Record<string, Shape>,
  selectedShapes: Set<string>,
  x: number,
  y: number,
  clickPoint: Point
) => {
  const dragOffset = {
    x: clickPoint.x - x,
    y: clickPoint.y - y,
  };
  const dragSnapshot = [...selectedShapes]
    .map((id) => shapes[id]!)
    .map((shape) => ({
      id: shape.id,
      type: shape.type,
      original: JSON.parse(JSON.stringify(shape)),
    }));

  return {
    isDragging: true,
    dragOffset,
    dragSnapshot,
  };
};

export const getDraggedShapes = (
  shapes: Record<string, Shape>,
  dragSnapshots: {
    id: string;
    type: Shapes;
    original: Shape;
  }[],
  dx: number,
  dy: number
) => {
  return Object.fromEntries(
    Object.entries(shapes).map(([id, shape]) => {
      const snap = dragSnapshots.find((s) => s.id === id);
      if (!snap) return [id, shape];
      return [id, getDraggedShape(snap.original, dx, dy)];
    })
  );
};

const getDraggedShape = (shape: Shape, dx: number, dy: number): Shape => {
  switch (shape.type) {
    case Shapes.Arrow:
      return {
        ...shape,
        fromX: shape.fromX + dx,
        fromY: shape.fromY + dy,
        toX: shape.toX + dx,
        toY: shape.toY + dy,
      };
    case Shapes.Pencil:
      return {
        ...shape,
        points: shape.points.map((point: Point) => ({
          x: point.x + dx,
          y: point.y + dy,
        })),
      };
    default:
      return {
        ...shape,
        x: shape.x + dx,
        y: shape.y + dy,
      };
  }
};
