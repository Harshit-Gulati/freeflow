export type Point = {
  x: number;
  y: number;
};

export type XYHW = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum Tools {
  Select = "select",
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Arrow = "arrow",
  Pencil = "pencil",
  Text = "text",
}

export enum Shapes {
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Arrow = "arrow",
  Text = "text",
  Pencil = "pencil",
}
export type Shape =
  | RectangleShape
  | EllipseShape
  | ArrowShape
  | PencilShape
  | TextShape;

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RectangleShape {
  id: string;
  type: Shapes.Rectangle;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  stroke: Color;
  zIndex: number;
}

export type ResizeHandle =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type CornerMap = Record<ResizeHandle, Point>;

export type EllipseShape = {
  id: string;
  type: Shapes.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  zIndex: number;
};

export type ArrowShape = {
  id: string;
  type: Shapes.Arrow;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  stroke: Color;
  fill?: Color;
  zIndex: number;
};

export type PencilShape = {
  id: string;
  type: Shapes.Pencil;
  points: Point[];
  stroke: Color;
  zIndex: number;
  fill?: Color;
};

export type TextShape = {
  id: string;
  type: Shapes.Text;
  x: number;
  y: number;
  fontFamily: string;
  fontSize: number;
  width: number;
  height: number;
  text: string;
  fill: Color;
  stroke: Color;
  zIndex: number;
};

export type ArrowSnapshot = {
  id: string;
  type: Shapes.Arrow;
  fromRelX: number;
  fromRelY: number;
  toRelX: number;
  toRelY: number;
};

export type PencilSnapshot = {
  id: string;
  type: Shapes.Pencil;
  relPoints: Point[];
};

export type OtherSnapshots = {
  id: string;
  type: Shapes.Rectangle | Shapes.Ellipse;
  relX: number;
  relY: number;
  relW: number;
  relH: number;
};

export type TextSnapshot = {
  id: string;
  type: Shapes.Text;
  relX: number;
  relY: number;
  relW: number;
  relH: number;
  relFontSize: number;
};

export type Snapshot =
  | ArrowSnapshot
  | PencilSnapshot
  | TextSnapshot
  | OtherSnapshots;
