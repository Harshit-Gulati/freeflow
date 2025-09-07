import { Color } from "@/types/canvas";

export function colorToCss(color: Color) {
  const { r, g, b, a } = color;

  if (a === 1) {
    return (
      "#" +
      r.toString(16).padStart(2, "0") +
      g.toString(16).padStart(2, "0") +
      b.toString(16).padStart(2, "0")
    );
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
