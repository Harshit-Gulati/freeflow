import { IconProps } from "./types";

export const InfoIcon = ({
  size = 24,
  className,
  strokeColor = "",
  fillColor = "black",
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 -8 528 528"
      className={className}
    >
      <path
        fill={fillColor}
        stroke={strokeColor}
        d="M264 456q-54 0-100-27t-73-73-27-100 27-100 73-73 100-27 100 27 73 73 27 100-27 100-73 73-100 27m32-248v-64h-64v64zm0 160V240h-64v128z"
      />
    </svg>
  );
};
