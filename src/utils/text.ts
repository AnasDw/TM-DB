import { direction } from "direction";
import { CssDirection } from "../types/css";

export function getTextDirection(text: string): CssDirection {
  const textDirection = direction(text);

  return textDirection === "neutral" ? "ltr" : textDirection;
}
