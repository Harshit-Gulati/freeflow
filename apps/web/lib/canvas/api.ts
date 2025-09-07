import { Shape } from "@/types/canvas";

export async function createShape(boardId: string, shape: Shape) {
  const { id, ...shapeData } = shape;
  const res = await fetch(`/api/boards/${boardId}/shapes`, {
    method: "POST",
    body: JSON.stringify({
      shapeId: shape.id,
      data: shapeData,
    }),
  });
  if (!res.ok) throw new Error("Failed to create shape");
  return res.json();
}

export async function updateShape(shapeId: string, data: any) {
  const res = await fetch(`/api/shapes/${shapeId}`, {
    method: "PATCH",
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error("Failed to update shape");
  return res.json();
}

export async function deleteShape(shapeId: string) {
  const res = await fetch(`/api/shapes/${shapeId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete shape");
  return res.json();
}
