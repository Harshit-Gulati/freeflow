interface PlusIconProps {
  size?: number;
  strokeColorClass?: string;
  className?: string;
}

export const PlusIcon = ({
  size = 24,
  strokeColorClass,
  className,
}: PlusIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`${strokeColorClass ? `stroke-${strokeColorClass}` : `stroke-black dark:stroke-white`} ${className} transition-colors duration-200`}
    >
      <path
        d="M 12, 5 L 12, 19 M 5, 12 L 19, 12"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
