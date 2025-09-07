import { CombinedContextProvider } from "./context/combined-context-provider";

interface CanvasLayoutProps {
  children: React.ReactElement;
  params: Promise<{ boardId: string }>;
}

export default async function CanvasLayout({
  children,
  params,
}: CanvasLayoutProps) {
  const { boardId } = await params;
  return (
    <CombinedContextProvider boardId={boardId}>
      {children}
    </CombinedContextProvider>
  );
}
