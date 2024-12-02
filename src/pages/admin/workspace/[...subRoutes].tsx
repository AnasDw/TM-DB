import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFeatureFlagEnabled } from "posthog-js/react";
import WorkspaceSettings from "../../../features/admin-panel/workspace-settings";
import { AdminSideNavigationLayout } from "../../../layout/admin-layout/AdminSideNavigationLayout";
import { Pages } from "../../../utils/routes";

const WorkspaceSettingsIndex = () => {
  const router = useRouter();
  const isWorkspaceEnabled = useFeatureFlagEnabled("compliance-settings");

  useEffect(() => {
    if (isWorkspaceEnabled === false) {
      router.push(Pages.ADMIN_PAGE);
    }
  }, [router, isWorkspaceEnabled]);

  return (
    isWorkspaceEnabled && (
      <AdminSideNavigationLayout
        shouldDisplayCreateProjectControl={false}
        shouldDisplaySearchBar={false}
      >
        <WorkspaceSettings />
      </AdminSideNavigationLayout>
    )
  );
};

export default WorkspaceSettingsIndex;
