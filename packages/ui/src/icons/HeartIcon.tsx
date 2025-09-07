interface HeartIconProps {
  size?: number;
  className?: string;
  strokeColor?: string;
  fillColor?: string;
}

export const HeartIcon = ({
  size = 24,
  className,
  strokeColor = "black",
  fillColor = "none",
}: HeartIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.99.99 0 0 0 1.024 0C21.126 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3"
        stroke={strokeColor}
        fill={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
