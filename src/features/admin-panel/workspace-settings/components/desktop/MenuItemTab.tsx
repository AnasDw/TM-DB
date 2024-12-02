import { Layout } from "antd";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { WorkspaceTabRoutesV4 } from "../../../../../tab/enum";

const ComplianceSettings = dynamic(() => import("./compliance-settings"), {
  ssr: false,
});

const { Content } = Layout;

interface MenuItemTabProps {
  tabId: string;
}
const StyledContent = styled(Content)`
  padding: 1.5rem;
  overflow: auto;
`;

export const MenuItemTab: React.FC<MenuItemTabProps> = ({ tabId }) => {
  const getComponentForTab = (): React.ReactNode => {
    switch (tabId) {
      case WorkspaceTabRoutesV4.ComplianceSettings:
        return <ComplianceSettings />;

      default:
        return <ComplianceSettings />;
    }
  };
  const ComponentToRender = getComponentForTab();

  return <StyledContent id="tab">{ComponentToRender}</StyledContent>;
};
