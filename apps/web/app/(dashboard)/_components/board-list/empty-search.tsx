import { NoResultIcon } from "@repo/ui/icons";

export const EmptySearch = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-2 animate-fadeIn">
      <div>
        <NoResultIcon size={100} strokeColor="var(--color-primary-text)" />
      </div>
      <div className="text-primary-text text-4xl font-semibold">
        No Results Found!
      </div>
      <div className="text-secondary-text font-medium text-lg">
        Try searching for something else
      </div>
    </div>
  );
};
