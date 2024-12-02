import React, { useState } from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Space, Spin, Typography } from "antd";
import _ from "lodash";
import {
  RichTextEditor,
  STAR_SEPARATOR,
} from "../../../../../../../text-editor/RichTextEditor";
import useComplianceSettings, {
  sanitizeTermsConfiguration,
} from "../../../../custom-hooks/useComplianceSettings";
import { InterviewTermsInterface } from "../../../../interfaces";
import { StyledCard, StyledFormItem } from "../../../../styles";

export const InterviewTerms: React.FC = () => {
  const {
    complianceSettingsData,
    updateComplianceSettingsData,
    isUpdatingComplianceSettings,
    isLoadingComplianceSettings,
  } = useComplianceSettings();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const [form] = Form.useForm<InterviewTermsInterface>();

  const termsConfiguration = Form.useWatch("termsConfiguration", form);

  const initialValues = {
    termsConfiguration: Array.isArray(
      complianceSettingsData?.termsConfiguration
    )
      ? complianceSettingsData?.termsConfiguration
          .map((v) => `<p>${v}</p>`)
          .join(`\n<p>${STAR_SEPARATOR}</p>\n`)
      : complianceSettingsData?.termsConfiguration,
  };

  const parseHtmlToRows = (htmlInput: string): string[] => {
    const rows = htmlInput
      .split(STAR_SEPARATOR)
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => segment.replace(/\s+/g, " "))
      .map((sanitized) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitized, "text/html");

        return Array.from(doc.querySelectorAll("p"))
          .map((block) => (block.innerHTML ?? "").trim())
          .filter(Boolean)
          .map((line) => (line !== "<br>" ? line : ""))
          .join("<br>");
      });

    return rows.map(sanitizeTermsConfiguration);
  };

  const onFinish = async (values: InterviewTermsInterface) => {
    const parsedRows = parseHtmlToRows(values.termsConfiguration);
    try {
      await updateComplianceSettingsData({ termsConfiguration: parsedRows });
      setHasUnsavedChanges(false);
    } catch (error) {
      setHasUnsavedChanges(true);
    }
  };

  const onValuesChange = () => {
    const currentValues = form.getFieldsValue(true);

    const parseHtmlCurrentValues: string = parseHtmlToRows(
      currentValues.termsConfiguration
    ).join("");
    const parseHtmlInitialValues: string = parseHtmlToRows(
      initialValues.termsConfiguration as string
    ).join("");

    setHasUnsavedChanges(() => {
      return !_.isEqual(parseHtmlCurrentValues, parseHtmlInitialValues);
    });
  };

  return (
    <StyledCard bordered={false}>
      {isLoadingComplianceSettings ? (
        <Flex
          vertical
          justify="center"
          align="center"
          gap={16}
          style={{ height: "100%", width: "100%" }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Form
          layout="vertical"
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          disabled={isUpdatingComplianceSettings}
          form={form}
          initialValues={initialValues}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
        >
          <Typography.Title level={5}>
            {"termsConfigurationTitle"}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            {"termsConfigurationParagraph"}
          </Typography.Paragraph>
          <Flex
            vertical
            gap={16}
            style={{
              width: "100%",
              flexGrow: 1,
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Alert
              message={
                <Typography.Text>
                  {"termsConfigurationAlertMessage"}
                </Typography.Text>
              }
              icon={<BulbOutlined />}
              showIcon
            />
            <StyledFormItem name={"termsConfiguration"}>
              <RichTextEditor
                readOnly={isUpdatingComplianceSettings}
                value={termsConfiguration}
                onChange={(htmlValue) => {
                  form.setFieldValue("termsConfiguration", htmlValue);
                }}
              />
            </StyledFormItem>
          </Flex>
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: 8,
            }}
          >
            <Button
              onClick={() => {
                setIsPreviewModalOpen(true);
              }}
            >
              Preview
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdatingComplianceSettings}
              disabled={!hasUnsavedChanges}
            >
              {isUpdatingComplianceSettings ? "Saving changes" : "Save changes"}
            </Button>
          </Space>
        </Form>
      )}
    </StyledCard>
  );
};
