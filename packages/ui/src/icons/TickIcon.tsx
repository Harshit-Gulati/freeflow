import { IconProps } from "./types";

export const TickIcon = ({
  size = 24,
  className,
  fillColor = "none",
  strokeColor = "white",
}: IconProps) => {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M 20 6 L 9 17 L 4 12" />
    </svg>
  );
};
