"use client";

import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Info = ({
  title,
  renameBoard,
}: {
  title: string;
  renameBoard: (newTitle: string) => Promise<void>;
}) => {
  const renameInputRef = useRef<HTMLInputElement | null>(null);
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  const handleCancel = () => {
    setIsRenaming(false);

    if (renameInputRef.current) renameInputRef.current.value = title;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleBlur = () => {
    if (!isSubmitting) handleSubmit();
  };

  const handleSubmit = async () => {
    if (!renameInputRef.current) return;

    const newTitle = renameInputRef.current.value.trim();

    if (!newTitle || newTitle === title) {
      if (!newTitle) toast.error("Title cannot be empty!");

      if (title === newTitle)
        toast.error("New title cannot be same as before!");

      setIsRenaming(false);
      return;
    }

    try {
      setIsSubmitting(true);
      await renameBoard(newTitle);
      setIsRenaming(false);
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-canvas-compo text-primary-text rounded-md p-2 absolute top-2 left-2 h-12 shadow-md flex items-center">
      <Link
        href="/"
        className="h-10 flex items-center cursor-pointer rounded-md hover:bg-gray-dash/80 px-2"
      >
        <span className="text-purpure font-bold tracking-tighter">
          <span className="text-2xl">F</span>
          reeflow
        </span>
      </Link>
      <div className="font-bold text-purpure px-2">|</div>
      <div className="relative min-w-[120px] max-w-[200px]">
        {isRenaming ? (
          <input
            type="text"
            defaultValue={title}
            placeholder="Enter a title..."
            className="bg-unit-bg2 rounded-md text-primary-text focus:outline-2 focus:outline-purpure flex justify-center items-center px-2 cursor-pointer h-10 w-full"
            ref={renameInputRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
        ) : (
          <div
            className="w-full flex justify-center items-center px-2 cursor-pointer rounded-md hover:bg-gray-dash/80 h-10"
            onClick={() => setIsRenaming(true)}
            title="Click to edit"
          >
            <span className="truncate text-center">{title}</span>
          </div>
        )}
      </div>
    </div>
  );
};
