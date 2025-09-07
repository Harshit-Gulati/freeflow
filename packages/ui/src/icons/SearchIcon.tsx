interface SearchIconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const SearchIcon = ({
  size = 24,
  className,
  fillColor = "none",
  strokeColor = "black",
}: SearchIconProps) => {
  return (
    <svg height={size} width={size} viewBox="0 0 24 24" className={className}>
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
