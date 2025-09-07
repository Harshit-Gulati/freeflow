"use client";

import { Canvas } from "./_components/canvas";
import Error from "../../../components/error";
import { Info } from "./_components/info";
import { LayerControls } from "./_components/LayerControls";
import Loading from "../../../components/loading";
import { Text } from "./_components/text";
import { Toolbar } from "./_components/toolbar";
import { useCanvasContext } from "./context";
import { useBoard } from "./hooks/use-board";

const BoardPage = () => {
  const { boardId } = useCanvasContext();

  const { title, isLoading, error, renameBoard } = useBoard(boardId);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <main className="h-screen w-screen bg-canvas-bg touch-none relative animate-fadeIn">
      <Info title={title} renameBoard={renameBoard} />
      <Toolbar />
      <Canvas />
      <LayerControls />
      <Text />
    </main>
  );
};

export default BoardPage;
