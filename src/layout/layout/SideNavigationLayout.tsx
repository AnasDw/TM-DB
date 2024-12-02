import { PropsWithChildren } from "react";

import { Layout } from "antd";
import styled from "styled-components";

import { SideNavigation } from "./SideNavigation";

const StyledContent = styled(Layout.Content)`
  padding: 22px;
  min-height: 200px;
  overflow-y: auto;

  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  ::-ms-scrollbar {
    display: none; /* IE */
  }
`;

export const SideNavigationLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <Layout style={{ height: "100vh", maxHeight: "100vh" }}>
    <SideNavigation />
    <StyledContent>{children}</StyledContent>
  </Layout>
);
