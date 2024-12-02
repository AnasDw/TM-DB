import React, { useState } from "react";

import { Layout } from "antd";
import { useRouter } from "next/router";
import { StyledSider } from "../../../admin/analysis/AnalysisTabsV4";
import { MenuItemTab } from "./components/desktop/MenuItemTab";
import { SiderMenu } from "./components/desktop/SiderMenu";
import { SiderToggleButton } from "./components/desktop/SiderToggleButton";

const WorkspaceSettings = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { subRoutes } = router.query;

  let tabId: any;
  if (Array.isArray(subRoutes)) {
    [tabId] = subRoutes;
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: "100%", overflow: "clip" }}>
      <StyledSider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={"unset"}
      >
        <SiderMenu collapsed={collapsed} tabId={tabId} />
        <SiderToggleButton collapsed={collapsed} onToggle={toggleCollapsed} />
      </StyledSider>
      <MenuItemTab tabId={tabId} />
    </Layout>
  );
};

export default WorkspaceSettings;
