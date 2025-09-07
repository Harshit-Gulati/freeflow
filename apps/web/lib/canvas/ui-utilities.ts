import { XYHW } from "@/types/canvas";
import {
  COLOR_PICKER_HEIGHT,
  COLOR_PICKER_MARGIN,
  pickerWidth,
} from "./constants";

export const getLayerControlsPosition = (
  canvasRect: DOMRect,
  selectionBounds: XYHW
) => {
  const selectionCenterX = selectionBounds.x + selectionBounds.width / 2;

  let top = 0;

  const availableTop = selectionBounds.y;
  const availableBottom =
    canvasRect.height - (selectionBounds.y + selectionBounds.height);

  const placeAbove = availableTop > COLOR_PICKER_HEIGHT + COLOR_PICKER_MARGIN;
  const placeBelow =
    availableBottom > COLOR_PICKER_HEIGHT + COLOR_PICKER_MARGIN;

  if (placeAbove) {
    top = selectionBounds.y - COLOR_PICKER_HEIGHT - COLOR_PICKER_MARGIN;
  } else if (placeBelow) {
    top = selectionBounds.y + selectionBounds.height + COLOR_PICKER_MARGIN;
  } else {
    top =
      selectionBounds.y + selectionBounds.height / 2 - COLOR_PICKER_HEIGHT / 2;
  }

  const left = Math.max(
    0,
    Math.min(selectionCenterX - pickerWidth / 2, canvasRect.width - pickerWidth)
  );

  return { top, left, width: pickerWidth, height: COLOR_PICKER_HEIGHT };
};
