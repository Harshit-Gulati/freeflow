"use client";

import { useSearchParams } from "next/navigation";
import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";

const DashboardPage = ({ organization }: { organization: any }) => {
  const searchParams = useSearchParams();

  const query = {
    search: searchParams.get("search") ?? undefined,
    favorites: searchParams.get("favorites") ?? undefined,
  };

  return (
    <div className="text-primary-text flex-1 h-[calc(100%-72px)] p-1">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList organizationId={organization.id} query={query} />
      )}
    </div>
  );
};

export default DashboardPage;
