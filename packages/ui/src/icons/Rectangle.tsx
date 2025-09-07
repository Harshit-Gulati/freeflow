import { IconProps } from "./types";

export const Rectangle = ({
  size = 24,
  fillColor = "none",
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 24"
      fill={fillColor}
      className={className}
    >
      <rect
        x="2"
        y="2"
        width="38"
        height="20"
        rx="4"
        ry="4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
