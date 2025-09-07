import { IconProps } from "./types";

export const Undo = ({
  size = 24,
  fillColor = "none",
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10h13a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-5" />
      <path d="m7 6-4 4 4 4" />
    </svg>
  );
};
