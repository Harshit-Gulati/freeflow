import { EllipseShape, Point, XYHW } from "@/types/canvas";
import { DRAWING_SELECTION_PADDING } from "./constants";

export const isInsideSelectionBox = ({
  clickPoint,
  boxDimensions,
}: {
  clickPoint: Point;
  boxDimensions: XYHW;
}): boolean => {
  return (
    clickPoint.x >= boxDimensions.x &&
    clickPoint.y >= boxDimensions.y &&
    clickPoint.x <= boxDimensions.x + boxDimensions.width &&
    clickPoint.y <= boxDimensions.y + boxDimensions.height
  );
};

export const isPointInEllipse = (clickPoint: Point, ellipse: EllipseShape) => {
  const rx = ellipse.width / 2;
  const ry = ellipse.height / 2;
  const cx = ellipse.x + rx;
  const cy = ellipse.y + ry;

  const normX = (clickPoint.x - cx) / rx;
  const normY = (clickPoint.y - cy) / ry;

  return normX ** 2 + normY ** 2 <= 1;
};

export const isPointOnDrawing = (
  clickPoint: Point,
  points: Point[]
): boolean => {
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!;
    const b = points[i + 1]!;
    const distance = pointToSegmentDistance(clickPoint, a, b);

    if (distance <= DRAWING_SELECTION_PADDING) return true;
  }
  return false;
};

const pointToSegmentDistance = (
  clickPoint: Point,
  a: Point,
  b: Point
): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (dx === 0 && dy === 0)
    return Math.hypot(clickPoint.x - a.x, clickPoint.y - a.y);

  let t =
    ((clickPoint.x - a.x) * dx + (clickPoint.y - a.y) * dy) /
    (dx * dx + dy * dy);
  t = Math.max(0, Math.min(1, t));

  const nearestX = a.x + t * dx;
  const nearestY = a.y + t * dy;

  return Math.hypot(clickPoint.x - nearestX, clickPoint.y - nearestY);
};
