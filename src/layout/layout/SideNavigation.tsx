import { useMemo, useState } from "react";

import { CrownOutlined } from "@ant-design/icons";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
  BoltIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";

import RemainingCredits from "../../credit/RemainingCredits";
import { useUser } from "../../hooks/useUser";

const topMenuItems: any[] = [
  {
    key: "prompts",
    label: "Prompts",
    icon: <BoltIcon height={18} />,
  },
  {
    key: "interview-prep",
    label: "InterviewPreparation",
    icon: <AcademicCapIcon height={18} />,
  },
  {
    key: "api-keys",
    label: "API Keys",
    icon: <KeyIcon height={18} />,
    disabled: true,
  },
];

const bottomMenuItems: any[] = [
  {
    key: "info",
    label: "Info",
    icon: <QuestionMarkCircleIcon height={18} />,
    disabled: true,
  },
  {
    key: "signout",
    label: "Sign Out",
    icon: <ArrowRightOnRectangleIcon height={18} />,
    disabled: false,
  },
];

const SidebarContainer = styled.div`
  width: 80px;
  background: #fff;
  border-inline-end: 1px solid #e5e7eb;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 48px;
  margin: 20px auto;
  display: block;
`;

const BaseMenu = styled(Menu)`
  border-inline-end: none !important;
`;

const TopMenu = styled(BaseMenu)`
  flex: 100%;
`;

const BottomMenu = styled(BaseMenu)``;

const CenteredMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 0.75rem;
`;

export const SideNavigation = () => {
  const router = useRouter();
  const [isCollapsed] = useState(true);
  const { logout, isAdmin } = useUser();

  const bottomMenuItemsWithAdmin = useMemo(() => {
    if (isAdmin && !bottomMenuItems.some(({ key }) => key === "admin")) {
      return [
        {
          key: "admin",
          label: "AdminPanel",
          icon: <CrownOutlined height={18} />,
          disabled: false,
        },
        ...bottomMenuItems,
      ];
    }

    return bottomMenuItems;
  }, [isAdmin]);

  const handleTopMenuClick = (item: { key: any }) => {
    router.push(`/${item.key}`);
  };

  const handleBottomMenuClick = async (item: { key: string }) => {
    if (item.key === "signout") {
      await logout();
      return;
    }

    if (item.key === "info") {
      router.push("/info");
    }

    router.push(item.key);
  };

  return (
    <Layout.Sider collapsed={isCollapsed} style={{ overflow: "hidden" }}>
      <SidebarContainer>
        <Logo src={`${router.basePath}/assets/images/logoa1.png`} alt="Logo" />
        <TopMenu
          onClick={handleTopMenuClick}
          defaultSelectedKeys={["prompts"]}
          selectedKeys={[router.pathname.replace("/", "")]}
          items={topMenuItems}
          mode="inline"
        />
        <CenteredMenu>
          <RemainingCredits />
        </CenteredMenu>
        <BottomMenu
          onClick={handleBottomMenuClick}
          items={bottomMenuItemsWithAdmin}
          mode="inline"
        />
      </SidebarContainer>
    </Layout.Sider>
  );
};
