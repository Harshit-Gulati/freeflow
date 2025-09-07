import { IconProps } from "./types";

export const MoreHorizontalIcon = ({
  size = 20,
  className,
  fillColor = "currentColor",
  strokeColor,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill={fillColor}
      stroke={strokeColor}
      className={className}
    >
      <circle cx="12" cy="24" r="3" />
      <circle cx="24" cy="24" r="3" />
      <circle cx="36" cy="24" r="3" />
    </svg>
  );
};
