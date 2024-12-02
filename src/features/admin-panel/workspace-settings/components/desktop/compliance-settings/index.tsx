import React from "react";
import { Flex, Typography } from "antd";
import { useComplianceSettingsLabels } from "../../../custom-hooks/useLabels";
import { InterviewTerms } from "./InterviewTerms/InterviewTerms";
import RetentionPanel from "./Retention/RetentionPanel";

const ComplianceSettings = () => {
  const { complianceSettingsTitle } = useComplianceSettingsLabels();
  return (
    <Flex
      style={{ height: "100%", minHeight: "min-content" }}
      vertical
      gap={24}
    >
      <Typography.Title level={4}>{complianceSettingsTitle}</Typography.Title>
      <RetentionPanel />
      <InterviewTerms />
    </Flex>
  );
};

export default ComplianceSettings;
