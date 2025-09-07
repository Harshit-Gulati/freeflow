import { LoaderIcon } from "@/components/loader-icon";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { BoardCard } from "./board-card";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyNotes } from "./empty-notes";
import { EmptySearch } from "./empty-search";
import { IconPlus } from "@tabler/icons-react";

interface BoardListProps {
  organizationId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch boards");
    return res.json();
  });

export const BoardList = ({ organizationId, query }: BoardListProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const queryKey = useMemo(() => {
    const params = new URLSearchParams({ orgId: organizationId });
    if (query.search) params.append("search", query.search);
    if (query.favorites) params.append("favorites", "true");
    return `/api/boards?${params.toString()}`;
  }, [organizationId, query.search, query.favorites]);

  const { data, error, isLoading, mutate } = useSWR(queryKey, fetcher);

  const createClickHandler = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Untitled", orgId: organizationId }),
      });

      if (!res.ok) throw new Error("Failed to create board");

      const board = await res.json();

      mutate();

      toast.success("Board created successfully");
      router.push(`/board/${board.id}`);
    } catch (err) {
      toast.error("Failed to create board");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading && !data) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <LoaderIcon />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">Failed to load boards</p>
        <button
          onClick={() => mutate()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const boards = Array.isArray(data) ? data : data?.boards || [];

  if (boards.length === 0) {
    if (query.search) return <EmptySearch />;
    if (query.favorites) return <EmptyFavorites />;
    return <EmptyNotes />;
  }

  return (
    <div className="animate-fadeIn">
      <h2 className="text-4xl p-4 font-semibold">
        {query.favorites ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 p-4 pb-10 w-full">
        <button
          className="aspect-[100/127] border-2 border-purpure bg-purpure rounded-md flex flex-col justify-center items-center overflow-hidden transition-colors duration-300 cursor-pointer text-white font-semibold text-lg hover:bg-purpure/80 disabled:opacity-50"
          onClick={createClickHandler}
          disabled={loading}
        >
          {loading ? <LoaderIcon /> : <IconPlus size={48} className="mb-4" />}
          {loading ? "Creating..." : "New Board"}
        </button>
        {boards.map((board: any) => (
          <BoardCard
            key={board.id}
            id={board.id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board.createdAt}
            orgId={board.orgId}
            isFavorite={board.isFavorite ?? false}
          />
        ))}
      </div>
    </div>
  );
};
