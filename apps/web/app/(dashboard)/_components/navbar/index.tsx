"use client";

import { useOrganization, UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { ClerkOrganisationSwitcher } from "../org-switcher";

export const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <div className="w-full p-4 flex justify-between items-center rounded-md text-primary-text bg-unit-bg">
      <div className="hidden lg:flex w-1/2">
        <SearchInput />
      </div>
      <div className="flex lg:hidden flex-1">
        <ClerkOrganisationSwitcher />
      </div>
      <div className="w-1/5 flex justify-end gap-2 items-center">
        {organization && <InviteButton />}
        <UserButton />
      </div>
    </div>
  );
};
