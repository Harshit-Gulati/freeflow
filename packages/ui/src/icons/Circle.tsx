import { IconProps } from "./types";

export const Circle = ({
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
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
};
