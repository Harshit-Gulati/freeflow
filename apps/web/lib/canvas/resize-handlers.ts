import {
  ArrowShape,
  ArrowSnapshot,
  CornerMap,
  EllipseShape,
  OtherSnapshots,
  PencilShape,
  PencilSnapshot,
  Point,
  RectangleShape,
  ResizeHandle,
  Shape,
  Shapes,
  Snapshot,
  TextShape,
  TextSnapshot,
  XYHW,
} from "@/types/canvas";
import { getCorners, getXYHW } from "./shapeBounds";
import { isInHandle } from "./selection";
import { measureText } from "./draw";

export const initializeResize = (
  liveSelectionBounds: XYHW,
  clickPoint: Point,
  shapes: Record<string, Shape>,
  selectedShapes: Set<string>
):
  | { isResizing: false }
  | {
      isResizing: true;
      resizingHandle: ResizeHandle;
      startPoint: Point;
      resizeContext?: any;
    } => {
  const { x, y, width, height } = liveSelectionBounds;
  const isMulti = selectedShapes.size > 1;

  const corners = getCorners(liveSelectionBounds);

  for (const key in corners) {
    const handle = key as keyof CornerMap;
    if (!isInHandle({ clickPoint, cornerPoint: corners[handle] })) continue;

    if (!isMulti) {
      return {
        isResizing: true,
        resizingHandle: handle,
        startPoint: clickPoint,
      };
    }

    const snapshots = createResizeSnapshots(
      shapes,
      selectedShapes,
      liveSelectionBounds
    );

    return {
      isResizing: true,
      resizingHandle: handle,
      startPoint: clickPoint,
      resizeContext: {
        boundingBox: { minX: x, minY: y, width, height },
        snapshots,
      },
    };
  }

  return { isResizing: false };
};

const createResizeSnapshots = (
  shapes: Record<string, Shape>,
  selectedShapes: Set<string>,
  bounds: XYHW
) => {
  return [...selectedShapes].map((id) => {
    const shape = shapes[id]!;
    const { x, y, width, height } = bounds;

    switch (shape.type) {
      case Shapes.Arrow:
        return {
          id,
          type: Shapes.Arrow,
          fromRelX: (shape.fromX - x) / width,
          fromRelY: (shape.fromY - y) / height,
          toRelX: (shape.toX - x) / width,
          toRelY: (shape.toY - y) / height,
        } as ArrowSnapshot;
      case Shapes.Pencil:
        return {
          id,
          type: Shapes.Pencil,
          relPoints: shape.points.map((point) => ({
            x: (point.x - x) / width,
            y: (point.y - y) / height,
          })),
        } as PencilSnapshot;
      case Shapes.Text: {
        return {
          id,
          type: Shapes.Text,
          relX: (shape.x - x) / width,
          relY: (shape.y - y) / height,
          relW: shape.width / width,
          relH: shape.height / height,
          relFontSize: shape.fontSize / width,
        } as TextSnapshot;
      }
      default:
        return {
          id,
          type: shape.type,
          relX: (shape.x - x) / width,
          relY: (shape.y - y) / height,
          relW: shape.width / width,
          relH: shape.height / height,
        } as OtherSnapshots;
    }
  });
};

export const getMultiResizedShapes = (
  resizeContext: any,
  resizingHandle: ResizeHandle,
  clickPoint: Point,
  shapes: Record<string, Shape>
): Record<string, Shape> => {
  const { boundingBox, snapshots } = resizeContext;
  const { minX, minY, width, height } = boundingBox;

  const oppositeCorner = {
    x: resizingHandle.includes("left") ? minX + width : minX,
    y: resizingHandle.includes("top") ? minY + height : minY,
  };

  const vectorX = clickPoint.x - oppositeCorner.x;
  const vectorY = clickPoint.y - oppositeCorner.y;

  const scaleX = vectorX / (resizingHandle.includes("left") ? -width : width);
  const scaleY = vectorY / (resizingHandle.includes("top") ? -height : height);

  const uniformScale = Math.min(scaleX, scaleY);

  const newWidth = width * uniformScale;
  const newHeight = height * uniformScale;

  let newMinX = minX;
  let newMinY = minY;

  if (resizingHandle.includes("left")) newMinX = oppositeCorner.x - newWidth;

  if (resizingHandle.includes("top")) newMinY = oppositeCorner.y - newHeight;

  return Object.fromEntries(
    Object.entries(shapes).map(([id, shape]) => {
      const snapshot = snapshots.find((snap: Snapshot) => snap.id === id);

      if (!snapshot) return [id, shape];

      return [
        id,
        getResizedShapeFromSnapshot(
          shape,
          snapshot,
          newMinX,
          newMinY,
          newWidth,
          newHeight
        ),
      ];
    })
  );
};

const getResizedShapeFromSnapshot = (
  shape: Shape,
  snapshot: Snapshot,
  newMinX: number,
  newMinY: number,
  newWidth: number,
  newHeight: number
): Shape => {
  switch (shape.type) {
    case Shapes.Arrow:
      const arrowSnap = snapshot as ArrowSnapshot;

      return {
        ...shape,
        fromX: newMinX + arrowSnap.fromRelX * newWidth,
        fromY: newMinY + arrowSnap.fromRelY * newHeight,
        toX: newMinX + arrowSnap.toRelX * newWidth,
        toY: newMinY + arrowSnap.toRelY * newHeight,
      };
    case Shapes.Pencil:
      const pencilSnap = snapshot as PencilSnapshot;

      const newPoints = pencilSnap.relPoints.map((rel) => ({
        x: newMinX + rel.x * newWidth,
        y: newMinY + rel.y * newHeight,
      }));

      return {
        ...shape,
        points: newPoints,
      };
    case Shapes.Text:
      const textSnap = snapshot as TextSnapshot;

      const newTextWidth = textSnap.relW * newWidth;
      const newFontSize = Math.max(
        Math.round(textSnap.relFontSize * (newTextWidth / textSnap.relW)),
        4
      );

      return {
        ...shape,
        x: newMinX + textSnap.relX * newWidth,
        y: newMinY + textSnap.relY * newHeight,
        ...measureText(shape.text, newFontSize, "Arial"),
        fontSize: newFontSize,
      };
    default:
      const otherSnap = snapshot as OtherSnapshots;

      return {
        ...shape,
        x: newMinX + otherSnap.relX * newWidth,
        y: newMinY + otherSnap.relY * newHeight,
        width: otherSnap.relW * newWidth,
        height: otherSnap.relH * newHeight,
      };
  }
};

export const getSingleResizedShape = (
  shape: Shape,
  clickPoint: Point,
  resizingHandle: ResizeHandle
): Shape => {
  switch (shape.type) {
    case Shapes.Arrow:
      return resizeArrow(shape, clickPoint, resizingHandle);
    case Shapes.Pencil:
      return resizePencil(shape, clickPoint, resizingHandle);
    case Shapes.Text:
      return resizeText(shape, clickPoint, resizingHandle);
    default:
      return resizeBasicShape(shape, clickPoint, resizingHandle);
  }
};

const resizeArrow = (
  shape: ArrowShape,
  clickPoint: Point,
  resizingHandle: ResizeHandle
): ArrowShape => {
  const isStartHandle = resizingHandle.includes("left");

  return {
    ...shape,
    fromX: isStartHandle ? clickPoint.x : shape.fromX,
    fromY: isStartHandle ? clickPoint.y : shape.fromY,
    toX: isStartHandle ? shape.toX : clickPoint.x,
    toY: isStartHandle ? shape.toY : clickPoint.y,
  };
};

const resizePencil = (
  shape: PencilShape,
  clickPoint: Point,
  resizingHandle: ResizeHandle
): PencilShape => {
  const bounds = getXYHW(shape);
  const { newX, newY, newWidth, newHeight } = calculateNewBounds(
    bounds,
    clickPoint,
    resizingHandle
  );

  const scaleX = newWidth / Math.max(bounds.width, 1);
  const scaleY = newHeight / Math.max(bounds.height, 1);

  const newPoints = shape.points.map((pt) => ({
    x: newX + (pt.x - bounds.x) * scaleX,
    y: newY + (pt.y - bounds.y) * scaleY,
  }));

  return {
    ...shape,
    points: newPoints,
  };
};

const resizeBasicShape = (
  shape: RectangleShape | EllipseShape,
  clickPoint: Point,
  resizingHandle: ResizeHandle
) => {
  const bounds = getXYHW(shape);
  const { newX, newY, newWidth, newHeight } = calculateNewBounds(
    bounds,
    clickPoint,
    resizingHandle
  );

  return {
    ...shape,
    x: newX,
    y: newY,
    width: Math.max(newWidth, 1),
    height: Math.max(newHeight, 1),
  };
};

const resizeText = (
  shape: TextShape,
  clickPoint: Point,
  resizingHandle: ResizeHandle
): TextShape => {
  const { newX, newY, newWidth, newHeight } = calculateNewBounds(
    shape,
    clickPoint,
    resizingHandle
  );

  const scale =
    resizingHandle.includes("right") || resizingHandle.includes("left")
      ? newWidth / shape.width
      : newHeight / shape.height;

  const newFontSize = Math.max(Math.round(shape.fontSize * scale), 1);
  const measured = measureText(shape.text, newFontSize, "Arial");

  return {
    ...shape,
    x: newX,
    y: newY,
    ...measured,
    ...(shape.type === "text" && { fontSize: newFontSize }),
  };
};

const calculateNewBounds = (
  bounds: XYHW,
  clickPoint: Point,
  handle: ResizeHandle
) => {
  let newX = bounds.x;
  let newY = bounds.y;
  let newWidth = bounds.width;
  let newHeight = bounds.height;

  switch (handle) {
    case "top-left":
      newX = clickPoint.x;
      newY = clickPoint.y;
      newWidth = bounds.x + bounds.width - clickPoint.x;
      newHeight = bounds.y + bounds.height - clickPoint.y;
      break;
    case "top-right":
      newY = clickPoint.y;
      newWidth = clickPoint.x - bounds.x;
      newHeight = bounds.y + bounds.height - clickPoint.y;
      break;
    case "bottom-left":
      newX = clickPoint.x;
      newWidth = bounds.x + bounds.width - clickPoint.x;
      newHeight = clickPoint.y - bounds.y;
      break;
    case "bottom-right":
      newWidth = clickPoint.x - bounds.x;
      newHeight = clickPoint.y - bounds.y;
      break;
  }

  return { newX, newY, newWidth, newHeight };
};
