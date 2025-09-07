import type { Shape } from "@/types/canvas";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { useCanvasContext } from "../context";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useBoard = (boardId: string) => {
  const {
    data: board,
    error: boardError,
    isLoading: boardLoading,
    mutate: mutateBoard,
  } = useSWR(`/api/boards/${boardId}`, fetcher);

  const renameBoard = async (newTitle: string) => {
    if (!board) return;
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle || trimmedTitle === board.title) return;

    try {
      await mutateBoard(
        async () => {
          const res = await fetch(`/api/boards/${boardId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: trimmedTitle }),
          });

          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData?.message || "Failed to rename board");
          }

          return res.json();
        },
        {
          optimisticData: { ...board, title: trimmedTitle },
          rollbackOnError: true,
          revalidate: true,
        }
      );

      toast.success("Board renamed successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Rename failed!";
      toast.error(errorMessage);
      throw err;
    }
  };

  const { setShapes } = useCanvasContext();
  const [shapesLoading, setShapesLoading] = useState(true);
  const [shapesError, setShapesError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        setShapesLoading(true);
        const res = await fetch(`/api/boards/${boardId}/shapes`);
        if (!res.ok) throw new Error("Failed to fetch shapes");

        const rawData = await res.json();
        const shapesRecord: Record<string, Shape> = Object.fromEntries(
          rawData.map((shape: any) => [
            shape.id,
            { ...shape.data, id: shape.id } as Shape,
          ])
        );

        setShapes(shapesRecord);
      } catch (err) {
        setShapesError(err as Error);
      } finally {
        setShapesLoading(false);
      }
    };

    fetchShapes();
  }, [boardId]);

  return {
    board,
    title: board?.title ?? "",
    isLoading: boardLoading || shapesLoading,
    error: boardError || shapesError,
    renameBoard,
  };
};
