import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
import { useState } from "react";
import { mutate } from "swr";
import { toast } from "sonner";
import { IconLink, IconTrash } from "@tabler/icons-react";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const [pending, setPending] = useState<boolean>(false);
  const [fav, setFav] = useState<boolean>(isFavorite);

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const toggleFav = async () => {
    setPending(true);
    try {
      const res = await fetch(`/api/boards/${id}/favorite`, {
        method: fav ? "DELETE" : "POST",
        body: JSON.stringify({ orgId }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

      setFav((prev) => !prev);

      mutate(`/api/boards?orgId=${orgId}`);
      mutate(`/api/boards?orgId=${orgId}&favorites=true`);

      toast.success(`Board ${fav ? "unfavorited" : "favorited"} successfully!`);
    } catch (error) {
      toast.success(`Failed to ${fav ? "unfavorite" : "favorite"} board`);
    } finally {
      setPending(false);
    }
  };

  const copyLinkHandler = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/board/${id}`
      );
      toast.success("Link copied successfully!");
    } catch {
      toast.error("Couldn't copy link!");
    }
  };

  const onDelete = async () => {
    setPending(true);
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId }),
      });

      if (!res.ok) throw new Error("Failed to delete board");

      mutate(`/api/boards?orgId=${orgId}`);
      mutate(`/api/boards?orgId=${orgId}&favorites=true`);

      toast.success("Board deleted successfully!");
    } catch (error) {
      toast.error("Couldn't delete board!");
    } finally {
      setPending(false);
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border-2 border-gray-stroke hover:border-purpure rounded-md flex flex-col justify-between overflow-hidden transition-colors duration-300">
        <div className="relative flex-1 bg-unit-bg">
          <Image src={imageUrl} alt="doodle" fill className="object-fit" />
          <div className="group-hover:opacity-40 opacity-0 transition-opacity duration-300 h-full w-full bg-black" />
          <div
            className="absolute top-2 right-2 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              className="aspect-square rounded-md hover:bg-unit-bg2 px-2 py-1 font-medium text-base cursor-pointer flex justify-start items-center transition-all mr-1"
              onClick={copyLinkHandler}
            >
              <IconLink size={20} />
            </button>
            <button
              className="aspect-square rounded-md hover:bg-unit-bg2 px-2 py-1 font-medium text-base cursor-pointer flex justify-start items-center transition-all"
              onClick={onDelete}
              disabled={pending}
            >
              <IconTrash size={20} />
            </button>
          </div>
        </div>
        <Footer
          title={title}
          isFavorite={fav}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          disabled={pending}
          onClick={toggleFav}
        />
      </div>
    </Link>
  );
};
