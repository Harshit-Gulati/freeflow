import { IconProps } from "./types";

export const Cursor = ({
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
        d="M19.54 3.1 3.62 10.31A1.17 1.17 0 0 0 4 12.5l6.23 1.26L11.5 20a1.17 1.17 0 0 0 2.19.39L20.9 4.46a1 1 0 0 0-1.36-1.36"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
