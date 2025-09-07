interface DashboardIconProps {
  size?: number;
  className?: string;
  fillColor?: string;
  strokeColor?: string;
}

export const DashboardIcon = ({
  size = 24,
  className,
  fillColor = "white",
  strokeColor = "black",
}: DashboardIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        d="M3 2h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m11 0h7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1M3 16h7a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m11-6h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1"
        fill={fillColor}
        stroke={strokeColor}
        className="transition-colors duration-500"
      />
    </svg>
  );
};
