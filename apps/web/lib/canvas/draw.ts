import {
  ArrowShape,
  EllipseShape,
  PencilShape,
  RectangleShape,
  Shape,
  Shapes,
  TextShape,
} from "@/types/canvas";
import { ARROW_HEAD_LEN, HANDLE_SIZE } from "./constants";
import { getCorners, getMinMax, getXYHW } from "./shapeBounds";

export const renderCanvas = (
  ctx: CanvasRenderingContext2D,
  shapes: Record<string, Shape>,
  selectedShapes: Set<string>
) => {
  Object.entries(shapes).forEach(([id, shape]) => {
    const isSelected = selectedShapes.has(id);

    switch (shape.type) {
      case Shapes.Rectangle:
        drawRectangle(ctx, shape, isSelected);
        break;
      case Shapes.Ellipse:
        drawEllipse(ctx, shape, isSelected);
        break;
      case Shapes.Arrow:
        drawArrow(ctx, shape, isSelected);
        break;
      case Shapes.Pencil:
        drawPencil(ctx, shape, isSelected);
        break;
      case Shapes.Text:
        drawText(ctx, shape, isSelected);
        break;
      default:
        break;
    }
  });

  if (selectedShapes.size > 1) {
    const selectedShapesArray = [...selectedShapes].map((id) => shapes[id]!);

    const { minX, maxX, maxY, minY } = getMinMax(selectedShapesArray);

    drawSelectionRectangle(ctx, minX, minY, maxX - minX, maxY - minY);
  }
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D,
  shape: RectangleShape,
  isSelected: boolean
) => {
  ctx.beginPath();
  ctx.rect(shape.x, shape.y, shape.width, shape.height);
  ctx.fillStyle = `rgba(${shape.fill.r}, ${shape.fill.g}, ${shape.fill.b}, ${shape.fill.a})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(${shape.stroke.r}, ${shape.stroke.g}, ${shape.stroke.b}, ${shape.stroke.a})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  if (isSelected)
    drawSelectionRectangle(ctx, shape.x, shape.y, shape.width, shape.height);
};

export const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  shape: EllipseShape,
  isSelected: boolean
) => {
  ctx.beginPath();
  ctx.ellipse(
    shape.x + shape.width / 2,
    shape.y + shape.height / 2,
    Math.abs(shape.width / 2),
    Math.abs(shape.height / 2),
    0,
    0,
    2 * Math.PI
  );

  ctx.fillStyle = `rgba(${shape.fill.r}, ${shape.fill.g}, ${shape.fill.b}, ${shape.fill.a})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(${shape.stroke.r}, ${shape.stroke.g}, ${shape.stroke.b}, ${shape.stroke.a})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  if (isSelected)
    drawSelectionRectangle(ctx, shape.x, shape.y, shape.width, shape.height);
};

export const drawArrow = (
  ctx: CanvasRenderingContext2D,
  shape: ArrowShape,
  isSelected: boolean
) => {
  const dx = shape.toX - shape.fromX;
  const dy = shape.toY - shape.fromY;
  const angle = Math.atan2(dy, dx);

  ctx.beginPath();
  ctx.moveTo(shape.fromX, shape.fromY);
  ctx.lineTo(shape.toX, shape.toY);
  ctx.lineTo(
    shape.toX - ARROW_HEAD_LEN * Math.cos(angle - Math.PI / 6),
    shape.toY - ARROW_HEAD_LEN * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(shape.toX, shape.toY);
  ctx.lineTo(
    shape.toX - ARROW_HEAD_LEN * Math.cos(angle + Math.PI / 6),
    shape.toY - ARROW_HEAD_LEN * Math.sin(angle + Math.PI / 6)
  );
  ctx.strokeStyle = `rgba(${shape.stroke.r}, ${shape.stroke.g}, ${shape.stroke.b}, ${shape.stroke.a})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  const { x, y, width, height } = getXYHW(shape);

  if (isSelected) drawSelectionRectangle(ctx, x, y, width, height);
};

export const drawPencil = (
  ctx: CanvasRenderingContext2D,
  shape: PencilShape,
  isSelected: boolean
) => {
  const points = shape.points;

  if (!points) return;

  ctx.strokeStyle = `rgba(${shape.stroke.r}, ${shape.stroke.g}, ${shape.stroke.b}, ${shape.stroke.a})`;
  ctx.fillStyle = `rgba(${shape.stroke.r}, ${shape.stroke.g}, ${shape.stroke.b}, ${shape.stroke.a})`;
  ctx.lineWidth = 2;

  if (shape.points.length === 2) {
    const p = shape.points[0]!;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(points[0]!.x, points[0]!.y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i]!.x, points[i]!.y);
    }

    ctx.stroke();
  }

  const { x, y, width, height } = getXYHW(shape);
  if (isSelected) drawSelectionRectangle(ctx, x, y, width, height);
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  shape: TextShape,
  isSelected: boolean
) => {
  ctx.strokeStyle = `rgba(${shape.stroke.r}, ${shape.stroke.g}, ${shape.stroke.b}, ${shape.stroke.a})`;
  ctx.fillStyle = `rgba(${shape.fill.r}, ${shape.fill.g}, ${shape.fill.b}, ${shape.fill.a})`;
  ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
  ctx.textBaseline = "middle";

  const { width, height } = measureText(
    shape.text,
    shape.fontSize,
    shape.fontFamily
  );
  const getFontAscent = (fontSize: number, fontFamily: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = `${fontSize}px ${fontFamily}`;
    return ctx.measureText("M").actualBoundingBoxAscent;
  };

  const fontAscent = getFontAscent(shape.fontSize, shape.fontFamily);

  const lines = shape.text.split("\n");
  const lineHeight = shape.fontSize * 1.2;
  lines.forEach((line, i) => {
    const y = shape.y + i * lineHeight + fontAscent;
    ctx.fillText(line, shape.x, y);
    ctx.strokeText(line, shape.x, y);
  });

  if (isSelected) drawSelectionRectangle(ctx, shape.x, shape.y, width, height);
};

export const measureText = (
  text: string,
  fontSize: number,
  fontFamily: string
) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  ctx.font = `${fontSize}px ${fontFamily}`;
  const lines = text.split("\n");
  const lineHeight = fontSize * 1.2;

  let maxWidth = 0;
  lines.forEach((line) => {
    const width = ctx.measureText(line).width;
    if (width > maxWidth) maxWidth = width;
  });

  return {
    width: maxWidth,
    height: lines.length * lineHeight,
  };
};

export const drawSelectionRectangle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const PADDING = 5;
  const halfHandle = HANDLE_SIZE / 2;

  const paddedX = x - PADDING;
  const paddedY = y - PADDING;
  const paddedWidth = width + 2 * PADDING;
  const paddedHeight = height + 2 * PADDING;

  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([4, 2]);
  ctx.strokeStyle = "dodgerblue";
  ctx.lineWidth = 1;
  ctx.rect(paddedX, paddedY, paddedWidth, paddedHeight);
  ctx.stroke();
  ctx.restore();

  const corners = Object.values(getCorners({ x, y, width, height }));

  const handleColor =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "#191d23"
      : "#ffffff";

  ctx.save();
  ctx.fillStyle = handleColor;
  ctx.strokeStyle = "dodgerblue";
  corners.forEach((pt) => {
    ctx.beginPath();
    ctx.roundRect(
      pt.x - halfHandle,
      pt.y - halfHandle,
      HANDLE_SIZE,
      HANDLE_SIZE,
      2
    );
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();
};
