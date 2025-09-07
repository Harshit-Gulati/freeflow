interface NoResultIconProps {
  size?: number;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

export const NoResultIcon = ({
  size = 24,
  className,
  strokeColor = "black",
  fillColor = "none",
}: NoResultIconProps) => {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
      <line
        x1="7"
        y1="7"
        x2="13"
        y2="13"
        strokeLinecap="round"
        stroke={strokeColor}
        fill={fillColor}
      />
      <line
        x1="13"
        y1="7"
        x2="7"
        y2="13"
        strokeLinecap="round"
        stroke={strokeColor}
        fill={fillColor}
      />
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth={2}
      />
      <line
        x1="22"
        y1="22"
        x2="15"
        y2="15"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};
