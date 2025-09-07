import { useEffect, useRef, useState } from "react";
import {
  Point,
  ResizeHandle,
  Shape,
  Shapes,
  Snapshot,
  Tools,
} from "@/types/canvas";
import { createShape, updateShape } from "@/lib/canvas/shape-utils";
import { renderCanvas } from "@/lib/canvas/draw";
import {
  getSelectedShapes,
  handleTextDoubleClick,
} from "@/lib/canvas/selection";
import { useSelectionBounds } from "./use-selection-bounds";
import {
  useCanvasContext,
  useToolContext,
  useTextContext,
  useColorContext,
  useAutosaveContext,
} from "../../context";
import { isInsideSelectionBox } from "@/lib/canvas/geometry";
import {
  getMultiResizedShapes,
  getSingleResizedShape,
  initializeResize,
} from "@/lib/canvas/resize-handlers";
import { getDraggedShapes, initializeDrag } from "@/lib/canvas/drag-handlers";

export const useCanvas = () => {
  const {
    setSelectionBounds,
    isDragging,
    setIsDragging,
    isResizing,
    setIsResizing,
    setCanvasRect,
    shapes,
    setShapes,
    selectedShapes,
    setSelectedShapes,
  } = useCanvasContext();
  const { fillColor, strokeColor } = useColorContext();
  const { handleTextMouseDown, editTextShape, setTextInput } = useTextContext();
  const { currentTool, setCurrentTool } = useToolContext();
  const { markForUpdate } = useAutosaveContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragSnapshotRef = useRef<
    | {
        id: string;
        type: Shapes;
        original: Shape;
      }[]
    | null
  >(null);
  const resizeContext = useRef<{
    boundingBox: { minX: number; minY: number; width: number; height: number };
    snapshots: Snapshot[];
  } | null>(null);
  const lastDragPointRef = useRef<Point | null>(null);
  const [resizingHandle, setResizingHandle] = useState<ResizeHandle | null>(
    null
  );

  const [dragOffset, setDragOffset] = useState<Point | null>(null);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const liveSelectionBounds = useSelectionBounds(shapes, selectedShapes);

  const onMouseDown = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const clickPoint = { x: offsetX, y: offsetY };

    switch (currentTool) {
      case Tools.Select:
        if (e.detail === 2) {
          const res = handleTextDoubleClick(shapes, clickPoint);
          if (res.found) {
            setSelectedShapes(new Set());
            editTextShape(res.shape, res.id);
            return;
          }
        }

        if (liveSelectionBounds) {
          // dragging logic
          if (
            isInsideSelectionBox({
              clickPoint,
              boxDimensions: liveSelectionBounds,
            })
          ) {
            const res = initializeDrag(
              shapes,
              selectedShapes,
              liveSelectionBounds.x,
              liveSelectionBounds.y,
              clickPoint
            );
            setIsDragging(res.isDragging);
            dragSnapshotRef.current = res.dragSnapshot;
            lastDragPointRef.current = clickPoint;
            setDragOffset(res.dragOffset);
            return;
          }

          // resizing logic
          const res = initializeResize(
            liveSelectionBounds,
            clickPoint,
            shapes,
            selectedShapes
          );
          if (res.isResizing) {
            setIsResizing(true);
            setResizingHandle(res.resizingHandle);
            setStartPoint(clickPoint);
            if (res.resizeContext) resizeContext.current = res.resizeContext;
            return;
          }
        }

        setSelectedShapes((prev) =>
          getSelectedShapes(clickPoint, shapes, e, prev)
        );
        return;
      case Tools.Text:
        handleTextMouseDown(offsetX, offsetY);
        break;
      default:
        setTextInput({ x: 0, y: 0, visible: false, value: "" });
        setStartPoint({ x: offsetX, y: offsetY });
        setIsDrawing(true);
        break;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const clickPoint = { x: offsetX, y: offsetY };

    if (currentTool === Tools.Select && selectedShapes.size !== 0) {
      if (selectedShapes.size > 1 && resizingHandle && resizeContext.current) {
        const newShapes = getMultiResizedShapes(
          resizeContext.current!,
          resizingHandle,
          clickPoint,
          shapes
        );

        setShapes(newShapes);

        selectedShapes.forEach((id) => markForUpdate(id));
      } else if (resizingHandle) {
        const [targetId] = [...selectedShapes];

        if (!targetId) return;

        setShapes((prev) => ({
          ...prev,
          [targetId]: getSingleResizedShape(
            prev[targetId]!,
            clickPoint,
            resizingHandle
          ),
        }));

        markForUpdate(targetId);
      } else if (
        isDragging &&
        dragOffset &&
        dragSnapshotRef.current &&
        lastDragPointRef.current
      ) {
        const current = { x: e.clientX, y: e.clientY };
        const dx = current.x - lastDragPointRef.current.x;
        const dy = current.y - lastDragPointRef.current.y;

        if (dx === 0 && dy === 0) return;

        setShapes((prev) =>
          getDraggedShapes(prev, dragSnapshotRef.current!, dx, dy)
        );

        dragSnapshotRef.current.forEach((snap) => markForUpdate(snap.id));
      }
    }

    if (!isDrawing || !startPoint) return;

    const currentPoint = { x: offsetX, y: offsetY };

    setShapes((prev) => {
      const ids = Object.keys(prev);
      if (ids.length === 0) return prev;

      const latestId = ids[ids.length - 1]!;
      const latest = prev[latestId];

      return {
        ...prev,
        [latestId]: updateShape(currentTool, latest, currentPoint, startPoint),
      };
    });
  };

  const onMouseUp = () => {
    if (currentTool === Tools.Pencil) {
      const ids = Object.keys(shapes);
      const latestId = ids[ids.length - 1]!;
      const latestShape = shapes[latestId];
      if (
        latestShape?.type === Shapes.Pencil &&
        latestShape.points.length === 1
      ) {
        setShapes((prev) => {
          return {
            ...prev,
            [latestId]: updateShape(
              currentTool,
              latestShape,
              latestShape.points[0]!,
              latestShape.points[0]!
            ),
          };
        });
      }
    }

    if (isDrawing) {
      const saveShape = () => {
        const ids = Object.keys(shapes);
        if (ids.length > 0) {
          const latestId = ids[ids.length - 1]!;
          markForUpdate(latestId);
        }
      };

      saveShape();

      setCurrentTool(Tools.Select);
    }
    setIsDrawing(false);
    setResizingHandle(null);
    setIsResizing(false);
    setIsDragging(false);
    setDragOffset(null);
    setStartPoint(null);
    lastDragPointRef.current = null;
    resizeContext.current = null;
  };

  useEffect(() => {
    if (isDrawing && startPoint) {
      const newShape = createShape(
        currentTool,
        startPoint,
        fillColor,
        strokeColor,
        Object.keys(shapes).length
      );

      setShapes((prev) => ({ ...prev, [newShape.id]: newShape }));
    }
  }, [isDrawing, startPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    renderCanvas(ctx, shapes, selectedShapes);
  }, [shapes, selectedShapes]);

  useEffect(() => {
    if (isDragging || isResizing) return;

    if (selectedShapes.size === 0) {
      setSelectionBounds(null);
      return;
    }

    setSelectionBounds((prev) => {
      const changed =
        !prev ||
        prev.x !== liveSelectionBounds?.x ||
        prev.y !== liveSelectionBounds?.y ||
        prev.width !== liveSelectionBounds?.width ||
        prev.height !== liveSelectionBounds?.height;

      return changed ? liveSelectionBounds : prev;
    });
  }, [selectedShapes, liveSelectionBounds, setSelectionBounds]);

  useEffect(() => {
    const updateRect = () => {
      if (canvasRef.current)
        setCanvasRect(canvasRef.current.getBoundingClientRect());
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  return { onMouseDown, onMouseMove, onMouseUp, canvasRef };
};
