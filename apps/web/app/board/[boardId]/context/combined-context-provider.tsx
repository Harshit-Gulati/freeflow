import {
  CanvasContextProvider,
  ColorContextProvider,
  TextContextProvider,
  ToolContextProvider,
  AutosaveContextProvider,
} from "./";

export const CombinedContextProvider = ({
  children,
  boardId,
}: {
  children: React.ReactElement;
  boardId: string;
}) => {
  return (
    <CanvasContextProvider boardId={boardId}>
      <AutosaveContextProvider>
        <ColorContextProvider>
          <ToolContextProvider>
            <TextContextProvider>{children}</TextContextProvider>
          </ToolContextProvider>
        </ColorContextProvider>
      </AutosaveContextProvider>
    </CanvasContextProvider>
  );
};
