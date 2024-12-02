import { notification, theme, ThemeConfig } from "antd";

import { colors } from "./colors";

const purplePalette = colors.purple.reduce(
  (acc: Record<string, string>, value: string, index: number) => {
    acc[`purple${index + 1}`] = value;
    return acc;
  },
  {}
);

const greyPalette = colors.grey.reduce(
  (acc: Record<string, string>, value: string, index: number) => {
    acc[`grey${index + 1}`] = value;
    return acc;
  },
  {}
);

notification.config({
  placement: "bottomRight",
});

export const antTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: colors.purple?.primary,
    fontFamily: "Inter",
    colorText: colors.grey[5],
    colorBorder: colors.grey[1],
    ...purplePalette,
    controlItemBgHover: colors.purple[0],
    ...greyPalette,
    colorLinkHover: colors.purple[4],
    colorLinkActive: colors.purple.primary,
    colorLink: colors.purple.primary,
    colorTextTertiary: colors.grey[2],
    colorBgSpotlight: colors.grey[5],
  },
  components: {
    Card: {
      boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
    },
    Progress: {
      defaultColor: colors.purple.primary,
      colorSuccess: colors.purple.primary,
    },
    Menu: {
      itemSelectedBg: colors.purple.primary,
      itemSelectedColor: "white",
    },
    Table: {
      rowExpandedBg: colors.purple[0],
    },
    Alert: {
      colorInfoBg: colors.purple[0],
      colorInfoBorder: colors.purple[2],
      colorInfo: colors.purple.primary,
    },
    ColorPicker: {
      colorBorder: "transparent",
      colorBgContainerDisabled: "transparent",
    },
    Select: {
      multipleItemBg: colors.purple[0],
    },
    Avatar: {
      containerSizeSM: 16,
    },
  },
};
