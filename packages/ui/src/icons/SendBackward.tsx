import { IconProps } from "./types";

export const SendBackward = ({
  size = 24,
  fillColor = "currentColor",
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="16 16 46 46"
      fill={fillColor}
      className={className}
      baseProfile="full"
    >
      <path d="M19 51V19h32v10H29v22zm11-21h29v29H30zm3 3v23h23V33z" />
    </svg>
  );
};
