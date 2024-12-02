import React from "react";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Menu, Typography } from "antd";
import { useRouter } from "next/router";
import {
  backButton,
  getItem,
  MenuItem,
  menuWidth,
  menuWidthCollapsed,
} from "../../../../../admin/analysis/AnalysisTabsV4";
import { useTenant } from "../../../../../contexts/TenantContext";
import { colors } from "../../../../../lib/theme/colors";
import { StyledText } from "../../../../../lib/theme/GlobalStyle";
import { WorkspaceTabRoutesV4 } from "../../../../../tab/enum";
import { Pages } from "../../../../../utils/routes/consts";
import { HelpCenterMenu } from "./HelpCenterMenu";

const COMPANY_PROFILE_KEY = "company-profile";

export const SiderMenu: React.FC<{ collapsed: boolean; tabId: string }> = ({
  collapsed,
  tabId,
}) => {
  const router = useRouter();
  const { currentTenantName } = useTenant();

  const SiderMenuItems: MenuItem[] = [
    getItem({
      label: (
        <StyledText
          font_weight="400"
          font_color={colors.grey[3]}
          font_size=".875rem"
        >
          {currentTenantName}
        </StyledText>
      ),
      icon: (
        <Avatar
          size={"small"}
          style={{
            backgroundColor: colors.grey[1],
          }}
        >
          {currentTenantName.at(0)?.toUpperCase() || ""}
        </Avatar>
      ),
      key: COMPANY_PROFILE_KEY,
      style: { paddingInline: collapsed ? "35%" : "10%" },
    }),
    getItem({
      label: "Compliance settings",
      key: WorkspaceTabRoutesV4.ComplianceSettings,
      icon: <SettingOutlined />,
      style: { paddingInline: collapsed ? "35%" : "10%" },
    }),
    { type: "divider" },
  ];

  const handleKeySelected = (ev: any) => {
    if (ev.key !== COMPANY_PROFILE_KEY) {
      router.push(Pages.WORKSPACE(ev.key));
    }
  };

  return (
    <>
      <Menu
        mode="inline"
        selectable={false}
        items={[
          getItem({
            label: (
              <Typography.Text
                style={{ color: colors.purple.primary }}
                onClick={() => router.push(Pages.ADMIN_PAGE)}
              >
                {backButton}
              </Typography.Text>
            ),
            key: backButton,
            icon: (
              <ArrowLeftOutlined
                onClick={() => router.push(Pages.ADMIN_PAGE)}
                style={{ color: colors.purple.primary, fontSize: "1.5rem" }}
              />
            ),
          }),
        ]}
        style={{
          width: collapsed ? menuWidthCollapsed : menuWidth,
          paddingTop: "1.25rem",
          paddingBottom: "1.75rem",
        }}
      />
      <Menu
        defaultSelectedKeys={[WorkspaceTabRoutesV4.ComplianceSettings]}
        mode="inline"
        items={SiderMenuItems}
        style={{ width: collapsed ? menuWidthCollapsed : menuWidth }}
        onSelect={handleKeySelected}
        selectedKeys={[tabId]}
      />
      <HelpCenterMenu
        collapsed={collapsed}
        menuWidth={menuWidth}
        menuWidthCollapsed={menuWidthCollapsed}
      />
    </>
  );
};
