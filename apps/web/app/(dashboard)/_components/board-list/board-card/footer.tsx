import { StarIcon } from "@repo/ui/icons";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  disabled,
  onClick,
}: FooterProps) => {
  return (
    <div className="relative bg-unit-bg2 p-3 group-hover:bg-purpure transition-colors duration-300">
      <p className="truncate max-w-[calc(100%-20px)] text-base group-hover:text-white transition-colors duration-300">
        {title}
      </p>
      <p className="transition duration-300 opacity-0 group-hover:opacity-100 group-hover:text-gray-dash text-sm text-secondary-text dark:group-hover:text-secondary-text truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        className={`transition duration-300 absolute top-3 right-3 cursor-pointer ${disabled ? "cursor-not-allowed opacity-75" : "opacity-0 group-hover:opacity-100"}`}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClick();
        }}
      >
        <StarIcon
          size={18}
          className="text-gray-dash dark:text-secondary-text hover:text-white"
          fillColor={isFavorite ? "currentColor" : "none"}
        />
      </button>
    </div>
  );
};
