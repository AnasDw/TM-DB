import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { colors } from "../../../../../lib/theme/colors";
import { HELP_CENTER_URL } from "../../../../../utils/routes";

interface HelpCenterMenuProps {
  collapsed: boolean;
  menuWidth: number;
  menuWidthCollapsed: number;
}

export const HelpCenterMenu: React.FC<HelpCenterMenuProps> = ({
  collapsed,
  menuWidth,
  menuWidthCollapsed,
}) => {
  const menuItems = [
    {
      label: (
        <Typography.Text style={{ color: colors.purple.primary }}>
          <a href={HELP_CENTER_URL} target="_blank" rel="noreferrer">
            Help center
          </a>
        </Typography.Text>
      ),
      key: "HelpCenter",
      icon: <QuestionCircleOutlined style={{ color: colors.purple.primary }} />,
    },
  ];

  return (
    <Menu
      mode="inline"
      items={menuItems}
      style={{
        paddingBottom: 16,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        width: collapsed ? menuWidthCollapsed : menuWidth,
      }}
      selectable={false}
    />
  );
};
