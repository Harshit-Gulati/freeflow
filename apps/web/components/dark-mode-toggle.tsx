"use client";

import { DayIcon } from "@repo/ui/icons";

export const DarkModeToggle = ({ variant = "1" }: { variant: "1" | "2" }) => {
  return (
    <button
      className={
        variant === "1"
          ? "p-2 aspect-square h-10 w-10 mx-3 flex justify-center items-center hover:bg-unit-bg2 rounded-md text-primary-text cursor-pointer"
          : "bg-unit-bg2 text-primary-text rounded-md p-2 aspect-square h-10 hover:bg-gray-dash/80 cursor-pointer"
      }
      onClick={() => {
        if (document.documentElement.getAttribute("data-theme")) {
          document.documentElement.removeAttribute("data-theme");
        } else document.documentElement.setAttribute("data-theme", "dark");
      }}
    >
      <DayIcon size={21} />
    </button>
  );
};
