interface CloseIconProps {
  active?: boolean;
  animated?: boolean;
  size?: number;
  className?: string;
  strokeColorClass?: string;
}

export const CloseIcon = ({
  active = true,
  animated = false,
  size = 24,
  strokeColorClass,
  className,
}: CloseIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`${strokeColorClass ? `stroke-${strokeColorClass}` : `stroke-primary-text`} ${className} transition-colors duration-200`}
    >
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transition: animated ? "transform 300ms ease 100ms" : undefined,
          transform: active ? "rotate(45deg)" : undefined,
        }}
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transition: animated ? "transform 300ms ease 100ms" : undefined,
          transform: active ? "rotate(-45deg)" : undefined,
          opacity: active ? 1 : 0,
        }}
      />
    </svg>
  );
};
