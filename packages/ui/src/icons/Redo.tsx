import { IconProps } from "./types";

export const Redo = ({
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
      <path d="M20 10H7a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h5" />
      <path d="m17 6 4 4-4 4" />
    </svg>
  );
};
