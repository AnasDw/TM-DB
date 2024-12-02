import { PropsWithChildren } from "react";

import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
  max-height: 100vh;
`;

export const AdminProjectCreationLayout: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <StyledLayout>
      <Content>{children}</Content>
    </StyledLayout>
  );
};
