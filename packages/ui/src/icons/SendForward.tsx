import { IconProps } from "./types";

export const SendForward = ({
  size = 24,
  fillColor = "currentColor",
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="16 16 44 44"
      fill={fillColor}
      className={className}
    >
      <rect
        x="19"
        y="19"
        width="32"
        height="32"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
      />
      <rect x="30" y="30" width="29" height="29" fill={fillColor} />
    </svg>
  );
};
