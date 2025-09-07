import { IconArrowDown } from "@tabler/icons-react";
import { Features } from "./features";

export const MainSection = () => {
  return (
    <div className="container max-w-4xl h-4/5 flex flex-col justify-between items-center p-4 mx-auto">
      <div className="text-2xl md:text-3xl flex justify-center items-center font-bold tracking-tighter font-poppins">
        freeflow
      </div>
      <div className="text-3xl md:text-4xl font-semibold flex flex-col items-center my-6 tracking-tight text-shadow-lg">
        <span>Think Together</span>
        <span>Create Together</span>
      </div>
      <div className="mb-2 max-w-xl text-wrap text-center text-base md:text-xl font-medium text-shadow-md">
        Your team's infinite canvas for brainstorming, planning, and visual
        collaboration—simple, fast, and distraction-free.
      </div>
      <Features />
      <div className="rounded-full size-10 absolute bottom-4 left-1/2 bg-white -translate-x-1/2 animate-bounce text-black flex justify-center items-center">
        <IconArrowDown className="size-6" />
      </div>
    </div>
  );
};
