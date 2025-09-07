"use client";

import { DashboardIcon, StarIcon } from "@repo/ui/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClerkOrganisationSwitcher } from "./org-switcher";

export const OrgSidebar = () => {
  const searchParams = useSearchParams();

  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col items-center space-y-4 w-56 h-full bg-unit-bg text-primary-text">
      <Link href="/" className="mt-4">
        <div className="flex justify-center items-center text-xl">
          <span className="text-purpure text-2xl font-bold tracking-tighter">
            freeflow
          </span>
        </div>
      </Link>
      <ClerkOrganisationSwitcher />
      <div className="w-full p-2">
        <Link
          href="/"
          className={`w-full p-2 flex justify-start items-center ${!favorites && `bg-unit-bg2`} hover:bg-unit-bg2 rounded-md text-primary-text`}
        >
          <DashboardIcon
            fillColor={favorites ? "none" : "var(--color-purpure)"}
            strokeColor={
              favorites ? "var(--color-primary-text)" : "var(--color-purpure)"
            }
            className="mr-2"
          />
          Team Boards
        </Link>
      </div>
      <div className="w-full p-2">
        <Link
          href={{
            pathname: "/",
            query: { favorites: true },
          }}
          className={`w-full p-2 flex justify-start items-center ${favorites && `bg-unit-bg2`} hover:bg-unit-bg2 rounded-md`}
        >
          <StarIcon
            fillColor={favorites ? "var(--color-purpure)" : "none"}
            strokeColor={
              favorites ? "var(--color-purpure)" : "var(--color-primary-text)"
            }
            className="mr-2"
          />
          Favorite Boards
        </Link>
      </div>
    </div>
  );
};
