import { FC } from "react";

export type CanvasDimensions = {
  rect: DOMRect;
  midY: number;
  midX: number;
};

export type ModuleStep = {
  stepNumber: number;
  canvasComponent: FC<{ canvasDimension: CanvasDimensions }>;
  markdown: string;
};
