import {
  FileTextOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Col, Layout, Select, theme } from "antd";
import { useRouter } from "next/router";
import { useFeatureFlagEnabled } from "posthog-js/react";
import styled from "styled-components";
import { SearchCases } from "../../admin/search/SearchCases";
import { withCustomAuthenticationRequired } from "../../authentication/WithCustomAuthenticationRequired";
import { useTenant } from "../../contexts/TenantContext";
import { useUser } from "../../hooks/useUser";
import { BagEnterpriseIcon } from "../../lib/svg-icons/system/BagEnterpriseIcon";
import { colors } from "../../lib/theme/colors";
import { CenterStyledCol, StyledRow } from "../../lib/theme/GlobalStyle";
import { TenantDTO } from "../../tenant";
import { HELP_CENTER_URL, Pages } from "../../utils/routes";
import { CreateProjectControl } from "./CreateProjectControl";

const { Header } = Layout;

const Logo = styled.img`
  width: 6.5rem;
  cursor: pointer;
`;

const StyledHeader = styled(Header)<{
  background: string;
}>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: ${({ background }) => background};
  padding: 0px 1.5rem;
`;

const AdminSideNavigationV4WithoutAuth = ({
  shouldDisplaySearchBar,
  shouldDisplayCreateProjectControl,
}: {
  shouldDisplaySearchBar: boolean;
  shouldDisplayCreateProjectControl: boolean;
}) => {
  const router = useRouter();
  const isWorkspaceEnabled = useFeatureFlagEnabled("compliance-settings");

  const { setTenant, currentTenant, clearCurrentTenant, tenants } = useTenant();
  const { logout, isGenway, user } = useUser({
    onLogout: clearCurrentTenant,
  });

  const handleMenuSelect = (value: string) => {
    if (value === "signout") {
      logout({ logoutParams: { returnTo: `${window.location.origin}/admin` } });
    } else if (value === "cases") {
      router.push(`/admin/case`);
    } else if (value === "workspace_settings") {
      router.push(Pages.WORKSPACE());
    } else if (value === "actions") {
      router.push(`/admin/case/actions`);
    } else if (value === "helpCenter") {
      window.open(HELP_CENTER_URL, "_blank");
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <StyledHeader background={colorBgContainer}>
        <Logo
          src={`${router.basePath}/assets/images/logo.png`}
          alt="Logo"
          onClick={() => router.push(`/admin/case`)}
        />
        {shouldDisplaySearchBar && (
          <CenterStyledCol span={8}>
            <SearchCases />
          </CenterStyledCol>
        )}
        <Col>
          <StyledRow justify={"center"} align={"middle"} gap="1rem">
            {shouldDisplayCreateProjectControl && <CreateProjectControl />}
            {currentTenant && user && tenants?.length > 1 && (
              <Select
                defaultValue={currentTenant}
                showSearch={true}
                optionFilterProp={"label"}
                style={{
                  minWidth: "10rem",
                }}
                onChange={(tenantId) => {
                  setTenant(tenantId);
                }}
                options={tenants.map((tenant: TenantDTO) => ({
                  value: tenant.tenant_id,
                  label: tenant.tenant_name,
                }))}
              />
            )}
            <Select
              value={user?.email}
              style={{
                minWidth: 185,
              }}
              onChange={(value) => {
                handleMenuSelect(value);
              }}
            >
              {isGenway && (
                <Select.Option value={"actions"}>
                  <StyledRow gap=".5rem" align={"middle"}>
                    <FileTextOutlined />
                    Actions
                  </StyledRow>
                </Select.Option>
              )}
              {isWorkspaceEnabled && (
                <Select.Option value={"workspace_settings"}>
                  <StyledRow wrap={false} gap=".5rem" align={"middle"}>
                    <BagEnterpriseIcon />
                    Workspace settings
                  </StyledRow>
                </Select.Option>
              )}
              <Select.Option value={"helpCenter"}>
                <StyledRow
                  gap=".5rem"
                  style={{ color: colors.purple.primary }}
                  align={"middle"}
                >
                  <QuestionCircleOutlined />
                  Help center
                </StyledRow>
              </Select.Option>
              <Select.Option value={"signout"}>
                <StyledRow
                  gap=".5rem"
                  style={{ color: colors.red[4] }}
                  align={"middle"}
                >
                  <LogoutOutlined />
                  Log out
                </StyledRow>
              </Select.Option>
            </Select>
          </StyledRow>
        </Col>
      </StyledHeader>
    </Layout>
  );
};

export const AdminSideNavigationV4 = withCustomAuthenticationRequired(
  AdminSideNavigationV4WithoutAuth
);
