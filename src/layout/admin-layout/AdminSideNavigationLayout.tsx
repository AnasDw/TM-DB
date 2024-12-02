import { PropsWithChildren } from "react";

import { Layout } from "antd";
import styled from "styled-components";

import { AdminSideNavigationV4 } from "./AdminSideNavigationV4";

const StyledContent = styled(Layout.Content)`
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
const StyledLayout = styled(Layout)`
  height: 100vh;
  max-height: 100vh;
`;

export const AdminSideNavigationLayout: React.FC<
  PropsWithChildren<{
    shouldDisplaySearchBar?: boolean;
    shouldDisplayCreateProjectControl?: boolean;
  }>
> = ({
  children,
  shouldDisplaySearchBar = true,
  shouldDisplayCreateProjectControl = true,
}) => {
  return (
    <StyledLayout>
      <AdminSideNavigationV4
        shouldDisplaySearchBar={shouldDisplaySearchBar}
        shouldDisplayCreateProjectControl={shouldDisplayCreateProjectControl}
      />
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};
