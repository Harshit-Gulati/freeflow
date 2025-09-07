import { Trash } from "@repo/ui/icons";
import { useCanvasContext } from "../../context/canvas-context";
import { ToolButton } from "../tool-button";

export const MiscControls = () => {
  const { setShapes, selectedShapes, setSelectedShapes, boardId } =
    useCanvasContext();

  const onDelete = async () => {
    setShapes((prev) => {
      const entries = Object.entries(prev).filter(
        ([id]) => !selectedShapes.has(id)
      );
      return Object.fromEntries(entries);
    });

    setSelectedShapes(new Set());

    // TODO delete from db
  };
  return (
    <div className="text-primary-text flex justify-center items-center">
      <ToolButton
        icon={Trash}
        label={"Delete layer"}
        isActive={false}
        isDisabled={false}
        onClick={onDelete}
      />
    </div>
  );
};
