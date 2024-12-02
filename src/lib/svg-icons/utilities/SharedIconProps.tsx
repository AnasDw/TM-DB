import Icon from "@ant-design/icons";
import { GetProps } from "antd";

export type CustomIconComponentProps = GetProps<typeof Icon> & {
  iconSize?: "small" | "medium" | "large";
};

export const sizeMap: Record<"small" | "medium" | "large", number> = {
  small: 24,
  medium: 40,
  large: 56,
};
