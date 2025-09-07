interface ToolButtonProps {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  isActive: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled = false,
}: ToolButtonProps) => {
  return (
    <button
      className={`rounded-md p-1.5 ${isDisabled ? `text-gray-stroke cursor-not-allowed` : `cursor-pointer hover:bg-gray-dash/80`} ${isActive && `bg-purpure/50`}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Icon size={20} />
    </button>
  );
};
