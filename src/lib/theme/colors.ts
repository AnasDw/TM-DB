import { presetPalettes } from "@ant-design/colors";

type Color =
  | "red"
  | "volcano"
  | "orange"
  | "gold"
  | "yellow"
  | "lime"
  | "green"
  | "pink"
  | "cyan"
  | "blue"
  | "geekblue"
  | "purple"
  | "magenta"
  | "grey";

presetPalettes.grey = [
  "#e8e8ec",
  "#c9c8d2",
  "#9d9cae",
  "#706d88",
  "#454264",
  "#1c1842",
  "#181438",
  "#14112f",
  "#100e26",
  "#0d0b1e",
];
presetPalettes.purple = [
  "#f0eefc",
  "#dbd7f7",
  "#beb8f1",
  "#9f96eb",
  "#8277e5",
  "#6759df",
  "#584cbe",
  "#493f9e",
  "#3b337f",
  "#2e2864",
];
presetPalettes.purple.primary = "#6759df";

presetPalettes.orange = [
  "#fff7e6",
  "#ffe7ba",
  "#ffd591",
  "#ffc069",
  "#ffa940",
  "#fa8c16",
  "#d46b08",
  "#ad4e00",
  "#873800",
  "#612500",
];

presetPalettes.yellow = [
  "#feffe6",
  "#ffffb8",
  "#fffb8f",
  "#fff566",
  "#ffec3d",
  "#fadb14",
  "#d4b106",
  "#ad8b00",
  "#876800",
  "#614700",
];

presetPalettes.green = [
  "#f6ffed",
  "#d9f7be",
  "#b7eb8f",
  "#95de64",
  "#73d13d",
  "#52c41a",
  "#389e0d",
  "#237804",
  "#135200",
  "#092b00",
];

presetPalettes.pink = [
  "#fff0f6",
  "#ffd6e7",
  "#ffadd2",
  "#ff85c0",
  "#f759ab",
  "#eb2f96",
  "#c41d7f",
  "#9e1068",
  "#780650",
  "#520339",
];

presetPalettes.cyan = [
  "#e6fffb",
  "#b5f5ec",
  "#87e8de",
  "#5cdbd3",
  "#36cfc9",
  "#13c2c2",
  "#08979c",
  "#006d75",
  "#00474f",
  "#002329",
];

// @ts-ignore
export const colors: Record<Color, string[] & { primary?: string }> = {
  ...presetPalettes,
};
