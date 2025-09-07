import { CombinedContextProvider } from "./context/combined-context-provider";

export default async function CanvasLayout({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { boardId: string };
}) {
  const { boardId } = await params;
  return (
    <CombinedContextProvider boardId={boardId}>
      {children}
    </CombinedContextProvider>
  );
}
