import React, { useEffect, useState } from "react";
import {
  AudioOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Flex, Form, Space, Spin } from "antd";
import _ from "lodash";
import { ScreenRecordingIcon } from "../../../../../../../lib/svg-icons/system/ScreenRecordingIcon";
import { colors } from "../../../../../../../lib/theme/colors";
import useComplianceSettings from "../../../../custom-hooks/useComplianceSettings";
import { useComplianceSettingsLabels } from "../../../../custom-hooks/useLabels";
import { ComplianceSettingsDTO } from "../../../../interfaces";
import { RetentionItemRow } from "./RetentionItemRow";

type ComplianceRetentionSettings = Omit<
  ComplianceSettingsDTO,
  "termsConfiguration"
>;

const RetentionPanel: React.FC = () => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changedFields, setChangedFields] = useState<
    Set<keyof ComplianceRetentionSettings>
  >(new Set());

  const {
    complianceSettingsData,
    updateComplianceSettingsData,
    isUpdatingComplianceSettings,
    isLoadingComplianceSettings,
  } = useComplianceSettings();

  const [form] = Form.useForm<ComplianceRetentionSettings>();

  const initialValues = {
    audioRetention: complianceSettingsData?.audioRetention,
    videoRetention: complianceSettingsData?.videoRetention,
    identifierRetention: complianceSettingsData?.identifierRetention,
    screenRecordingRetention: complianceSettingsData?.screenRecordingRetention,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [complianceSettingsData, form]);

  const handleSubmit = async () => {
    const allValues = form.getFieldsValue();

    const updatedFields: Partial<ComplianceRetentionSettings> = {};
    changedFields.forEach((field) => {
      updatedFields[field] = allValues[field];
    });

    try {
      await updateComplianceSettingsData(updatedFields);

      setChangedFields(new Set());
      setHasUnsavedChanges(false);
    } catch (error) {
      setHasUnsavedChanges(true);
    }
  };

  const handleValuesChange = (
    changedValues: Partial<ComplianceRetentionSettings>,
    allValues: ComplianceRetentionSettings
  ) => {
    const newChangedFields = new Set(changedFields);

    _.keys(changedValues).forEach((key) => {
      const field = key as keyof ComplianceRetentionSettings;

      if (
        complianceSettingsData &&
        !_.isEqual(complianceSettingsData[field], allValues[field])
      ) {
        newChangedFields.add(field);
      } else {
        newChangedFields.delete(field);
      }
    });
    setChangedFields(newChangedFields);
    setHasUnsavedChanges(newChangedFields.size > 0);
  };

  const {
    audioRetention,
    videoRetention,
    identifierRetention,
    screenRecordingRetention,
    identifierRetentionTooltip,
  } = useComplianceSettingsLabels();

  return (
    <Card styles={{ body: { padding: "32px 24px" } }} bordered={false}>
      <Form
        disabled={isUpdatingComplianceSettings}
        form={form}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {isLoadingComplianceSettings ? (
          <Flex
            vertical
            justify="center"
            align="center"
            gap={16}
            style={{ height: 200 }}
          >
            <Spin size="large" />
          </Flex>
        ) : (
          <Space direction="vertical" size={34} style={{ width: "100%" }}>
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <RetentionItemRow
                icon={<AudioOutlined style={{ color: colors.grey[3] }} />}
                title={audioRetention}
                fieldName="audioRetention"
              />
              <Divider style={{ margin: 0 }} />
              <RetentionItemRow
                icon={<VideoCameraOutlined style={{ color: colors.grey[3] }} />}
                title={videoRetention}
                fieldName="videoRetention"
              />
              <Divider style={{ margin: 0 }} />
              <RetentionItemRow
                icon={<ScreenRecordingIcon style={{ fontSize: "1rem" }} />}
                title={screenRecordingRetention}
                fieldName="screenRecordingRetention"
              />
              <Divider style={{ margin: 0 }} />
              <RetentionItemRow
                icon={<UserOutlined style={{ color: colors.grey[3] }} />}
                title={identifierRetention}
                toolTipText={identifierRetentionTooltip}
                fieldName="identifierRetention"
              />
            </Space>
            <Space
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={isUpdatingComplianceSettings}
                disabled={!hasUnsavedChanges}
              >
                {isUpdatingComplianceSettings
                  ? "Saving changes"
                  : "Save changes"}
              </Button>
            </Space>
          </Space>
        )}
      </Form>
    </Card>
  );
};

export default RetentionPanel;
