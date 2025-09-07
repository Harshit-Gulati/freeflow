interface StarIconProps {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const StarIcon = ({
  size = 24,
  className,
  fillColor = "currentColor",
  strokeColor = "currentColor",
}: StarIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className}>
      <path
        fill={fillColor}
        d="M10 1 7.22 6.27 1 7.11l4.5 4.1L4.44 17 10 14.27 15.56 17l-1.06-5.79 4.5-4.1-6.22-.84Z"
        className="transition-colors duration-500"
      />
      <path
        d="M10 1 7.22 6.27 1 7.11l4.5 4.1L4.44 17 10 14.27 15.56 17l-1.06-5.79 4.5-4.1-6.22-.84Z"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="transition-colors duration-300"
      />
    </svg>
  );
};
