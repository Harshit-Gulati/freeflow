import { AddOrganizationButton } from "./add-org-button";
import { List } from "./list";

export const Sidebar = () => {
  return (
    <div className="h-full w-16 bg-purpure flex flex-col py-4 items-center">
      <List />
      <AddOrganizationButton />
    </div>
  );
};
