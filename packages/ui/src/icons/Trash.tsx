import { IconProps } from "./types";

export const Trash = ({
  size = 24,
  fillColor = "none",
  className,
  strokeColor = "currentColor",
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      className={className}
      strokeWidth={2}
      stroke={strokeColor}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
};
