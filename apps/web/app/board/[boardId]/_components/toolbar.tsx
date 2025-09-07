import { Circle, Cursor, Pen, Rectangle, Arrow, Text } from "@repo/ui/icons";
import { ToolButton } from "./tool-button";
import { Tools } from "@/types/canvas";
import { useToolContext } from "../context";

const tools = [
  { label: "Select", icon: Cursor, tool: Tools.Select },
  { label: "Text", icon: Text, tool: Tools.Text },
  { label: "Arrow", icon: Arrow, tool: Tools.Arrow },
  { label: "Rectangle", icon: Rectangle, tool: Tools.Rectangle },
  { label: "Ellipse", icon: Circle, tool: Tools.Ellipse },
  { label: "Pencil", icon: Pen, tool: Tools.Pencil },
];

export const Toolbar = () => {
  const { currentTool, setCurrentTool } = useToolContext();

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-3">
      <div className="bg-canvas-compo rounded-md text-primary-text p-1 flex flex-col items-center shadow-md gap-y-1">
        {tools.map((tool, index) => {
          return (
            <ToolButton
              key={index}
              label={tool.label}
              icon={tool.icon}
              onClick={() => setCurrentTool(tool.tool)}
              isActive={currentTool === tool.tool}
            />
          );
        })}
      </div>
    </div>
  );
};
