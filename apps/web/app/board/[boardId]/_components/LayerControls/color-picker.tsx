import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";
import { Separator } from "./separator";
import { useColorContext } from "../../context";

const strokeColors: Color[] = [
  { r: 255, g: 255, b: 255, a: 1 },
  { r: 224, g: 49, b: 49, a: 1 },
  { r: 47, g: 158, b: 68, a: 1 },
  { r: 25, g: 113, b: 194, a: 1 },
  { r: 240, g: 140, b: 0, a: 1 },
];

const fillColors: Color[] = [
  { r: 255, g: 255, b: 255, a: 0 },
  { r: 255, g: 201, b: 201, a: 1 },
  { r: 178, g: 242, b: 187, a: 1 },
  { r: 165, g: 216, b: 255, a: 1 },
  { r: 255, g: 236, b: 153, a: 1 },
];

export const ColorPicker = () => {
  const { strokeColor, setStrokeColor, updateColor, fillColor, setFillColor } =
    useColorContext();

  return (
    <>
      <div className="flex flex-col">
        <div className="text-xs text-primary-text font-medium">Stroke</div>
        <div className="flex gap-1">
          {strokeColors.map((color, index) => (
            <ColorButton
              key={index}
              color={color}
              onClick={() => {
                setStrokeColor(color);
                updateColor(fillColor, color);
              }}
            />
          ))}
        </div>
      </div>
      <Separator />
      <div className="flex flex-col">
        <div className="text-xs text-primary-text font-medium">Fill</div>
        <div className="flex gap-1">
          {fillColors.map((color, index) => (
            <ColorButton
              key={index}
              color={color}
              onClick={() => {
                setFillColor(color);
                updateColor(color, strokeColor);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

interface ColorButtonProps {
  color: Color;
  onClick: () => void;
}

const checkerboardStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, #444 25%, transparent 25%),
    linear-gradient(-45deg, #444 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #444 75%),
    linear-gradient(-45deg, transparent 75%, #444 75%)`,
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
};

const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <button
      className="h-6 w-6 rounded-md flex justify-center items-center hover:opacity-75 transition cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="h-[22px] w-[22px] rounded-md group-hover:h-6 group-hover:w-6 transition-all"
        style={{
          ...(color.a < 1 ? checkerboardStyle : {}),
          backgroundColor: colorToCss(color),
        }}
      />
    </button>
  );
};
