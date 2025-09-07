import { HeartIcon } from "@repo/ui/icons";

export const EmptyFavorites = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-2 animate-fadeIn">
      <div>
        <HeartIcon size={100} strokeColor="var(--color-primary-text)" />
      </div>
      <div className="text-primary-text text-4xl font-semibold">
        No favorite boards!
      </div>
      <div className="text-secondary-text font-medium text-lg">
        Try favoriting a board
      </div>
    </div>
  );
};
