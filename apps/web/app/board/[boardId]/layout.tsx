import { CombinedContextProvider } from "./context/combined-context-provider";

export default function CanvasLayout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { boardId: string };
}) {
  const { boardId } = params;
  return (
    <CombinedContextProvider boardId={boardId}>
      {children}
    </CombinedContextProvider>
  );
}
