import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps, Typography } from "antd";
import { useRouter } from "next/router";
import { colors } from "../../../../../lib/theme/colors";
import { WorkspaceTabRoutesV4 } from "../../../../../tab/enum";
import { Pages } from "../../../../../utils/routers/consts";

export const backButton = "Back";
export const menuWidth = 236;
export const menuWidthCollapsed = 80;

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem({
  label,
  key,
  icon,
  children,
  type,
  style,
  disabled,
}: {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
  style?: React.CSSProperties;
  disabled?: boolean;
}): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    style,
    disabled,
  } as MenuItem;
}

const COMPANY_PROFILE_KEY = "company-profile";

export const SiderMenu: React.FC<{ collapsed: boolean; tabId: string }> = ({
  collapsed,
  tabId,
}) => {
  const router = useRouter();

  const SiderMenuItems: MenuItem[] = [
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
      router.push("Pages.WORKSPACE(ev.key)");
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
    </>
  );
};
