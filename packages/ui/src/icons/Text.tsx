import { IconProps } from "./types";

export const Text = ({
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
      <path
        d="M 4 4 L 20 4 M 12 4 L 12 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
};
