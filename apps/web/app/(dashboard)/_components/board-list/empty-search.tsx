import { IconZoomExclamation } from "@tabler/icons-react";

export const EmptySearch = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center space-y-2 animate-fadeIn">
      <div>
        <IconZoomExclamation size={100} stroke="var(--color-primary-text)" />
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
