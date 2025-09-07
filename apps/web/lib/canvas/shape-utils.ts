import {
  ArrowShape,
  Color,
  EllipseShape,
  PencilShape,
  Point,
  RectangleShape,
  Shapes,
  TextShape,
  Tools,
} from "@/types/canvas";
import { nanoid } from "nanoid";

export function createShape(
  tool: Tools,
  start: Point,
  fillColor: Color,
  strokeColor: Color,
  zIndex: number
) {
  switch (tool) {
    case Tools.Rectangle:
      return {
        id: nanoid(),
        type: Shapes.Rectangle,
        x: start.x,
        y: start.y,
        width: 0,
        height: 0,
        fill: fillColor,
        stroke: strokeColor,
        zIndex,
      } as RectangleShape;
    case Tools.Ellipse:
      return {
        id: nanoid(),
        type: Shapes.Ellipse,
        x: start.x,
        y: start.y,
        width: 0,
        height: 0,
        fill: fillColor,
        stroke: strokeColor,
        zIndex,
      } as EllipseShape;
    case Tools.Arrow:
      return {
        id: nanoid(),
        type: Shapes.Arrow,
        fromX: start.x,
        fromY: start.y,
        toX: start.x,
        toY: start.y,
        stroke: strokeColor,
        zIndex,
      } as ArrowShape;
    case Tools.Pencil:
      return {
        id: nanoid(),
        type: Shapes.Pencil,
        points: [start],
        stroke: strokeColor,
        zIndex,
      } as PencilShape;
    case Tools.Text:
      return {
        id: nanoid(),
        type: Shapes.Text,
        x: start.x,
        y: start.y,
        text: "",
        zIndex,
        fill: fillColor,
        fontFamily: "Arial",
        fontSize: 48,
        stroke: strokeColor,
      } as TextShape;
    default:
      throw new Error(`Unsupported tool: ${tool}`);
  }
}

export function updateShape(
  tool: Tools,
  shape: any,
  current: Point,
  origin: Point
) {
  switch (tool) {
    case Tools.Rectangle:
    case Tools.Text:
    case Tools.Ellipse:
      return {
        ...shape,
        x: origin.x,
        y: origin.y,
        width: current.x - origin.x,
        height: current.y - origin.y,
      };
    case Tools.Arrow:
      return {
        ...shape,
        fromX: origin.x,
        fromY: origin.y,
        toX: current.x,
        toY: current.y,
      };
    case Tools.Pencil:
      return {
        ...shape,
        points: [...shape.points, current],
      };
    default:
      return shape;
  }
}
