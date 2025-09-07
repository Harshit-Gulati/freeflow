import { IconProps } from "./types";

export const Cursor2 = ({
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
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path d="m3 3 7 19 2.051-6.154a6 6 0 0 1 3.795-3.795L22 10z" />
    </svg>
  );
};
