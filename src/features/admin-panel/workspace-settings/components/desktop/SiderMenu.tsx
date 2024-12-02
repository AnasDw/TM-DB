import { SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/router";

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
      key: "ComplianceSettings",
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
        defaultSelectedKeys={["ComplianceSettings"]}
        mode="inline"
        items={SiderMenuItems}
        style={{
          width: collapsed ? menuWidthCollapsed : menuWidth,
          flexGrow: 1,
        }}
        onSelect={handleKeySelected}
        selectedKeys={[tabId]}
      />
    </>
  );
};
