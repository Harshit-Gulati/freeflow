import { IconProps } from "./types";

export const ErrorIcon = ({
  size = 24,
  className,
  strokeColor = "none",
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
        d="M264 56q54 0 100 27t73 73 27 100-27 100-73 73-100 27-100-27-73-73-27-100 27-100 73-73 100-27Zm-32 88v128h64V144zm0 160v64h64v-64z"
        stroke={strokeColor}
        fill={fillColor}
      />
    </svg>
  );
};
