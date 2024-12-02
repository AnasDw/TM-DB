import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import sanitizeHtml from "sanitize-html";
import { IconTypeEnum } from "../../../../notification/enum";
import { openNotificationWithIcon } from "../../../../notification/openNotificationWithIcon";
import { queryClient } from "../../../../pages/_app";
import { workspaceServiceInstance } from "../../../../utils/api";
import { Routes } from "../../../../utils/routes";
import { ComplianceSettingsDTO } from "../interfaces";

export const sanitizeTermsConfiguration = (dirtyHtml: string): string => {
  return sanitizeHtml(dirtyHtml, {
    allowedTags: ["b", "i", "u", "a", "br", "strong", "em"],
    allowedAttributes: {
      a: ["href", "name", "target"],
    },
    disallowedTagsMode: "discard",
  });
};

const useComplianceSettings = () => {
  const {
    data: complianceSettingsData,
    isLoading: isLoadingComplianceSettings,
  } = useQuery<ComplianceSettingsDTO>(
    Routes.WORKSPACE.COMPLIANCE_SETTINGS,
    async () => {
      return (
        await workspaceServiceInstance.get(Routes.WORKSPACE.COMPLIANCE_SETTINGS)
      ).data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    isLoading: isUpdatingComplianceSettings,
    mutateAsync: mutateAsyncComplianceSettings,
  } = useMutation(
    async (updatedFields: Partial<ComplianceSettingsDTO>) => {
      return workspaceServiceInstance.put(
        Routes.WORKSPACE.COMPLIANCE_SETTINGS,
        updatedFields
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(Routes.WORKSPACE.COMPLIANCE_SETTINGS);
        openNotificationWithIcon(IconTypeEnum.Success, {
          description: "The changes have been successfully saved",
        });
      },
      onError: () => {
        openNotificationWithIcon(IconTypeEnum.Error, {
          description: "Oops! The changes couldn't be saved. Please try again.",
        });
      },
    }
  );

  const updateComplianceSettingsData = async (
    updatedFields: Partial<ComplianceSettingsDTO>
  ) => {
    await mutateAsyncComplianceSettings(updatedFields);
  };

  const sanitizedCompliancData = useMemo(
    () => ({
      ...complianceSettingsData,
      termsConfiguration: complianceSettingsData?.termsConfiguration.map(
        sanitizeTermsConfiguration
      ),
    }),
    [complianceSettingsData]
  );

  return {
    complianceSettingsData: sanitizedCompliancData,
    isLoadingComplianceSettings,
    updateComplianceSettingsData,
    isUpdatingComplianceSettings,
  };
};

export default useComplianceSettings;
