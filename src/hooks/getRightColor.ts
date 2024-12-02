import { colors } from "../lib/theme/colors";

export const getRightColor = (
  tagColor: string,
  luminance: number = 200
): string | undefined => {
  if (tagColor === "transparent") {
    return undefined;
  }

  if (tagColor) {
    const c: string = tagColor.substring(1); // strip #
    const rgb: number = parseInt(c, 16); // convert rrggbb to decimal
    // eslint-disable-next-line no-bitwise
    const r: number = (rgb >> 16) & 0xff; // extract red
    // eslint-disable-next-line no-bitwise
    const g: number = (rgb >> 8) & 0xff; // extract green
    // eslint-disable-next-line no-bitwise
    const b: number = (rgb >> 0) & 0xff; // extract blue

    const luma: number = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma > luminance) {
      return colors.grey[5];
    }
  }

  return "white";
};
