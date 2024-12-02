import { ReactNode } from "react";
import { Flex, Form, Radio, Tooltip } from "antd";
import {
  StyledInfoCircleOutlined,
  StyledText,
} from "../../../../../../../lib/theme/GlobalStyle";

const RetentionOptions = [
  { label: "3 months", value: 3 },
  { label: "6 months", value: 6 },
  { label: "12 months", value: 12 },
  { label: "Never", value: 0 },
];

export const RetentionItemRow: React.FC<{
  icon: ReactNode;
  title: string;
  toolTipText?: string;
  fieldName: string;
}> = ({ icon, title, fieldName, toolTipText }) => {
  return (
    <Flex wrap gap={16} justify="space-between" align="center">
      <Flex gap={8}>
        {icon}
        <StyledText font_size=".875rem">{title}</StyledText>
        {toolTipText && (
          <Tooltip title={toolTipText} placement="top">
            <StyledInfoCircleOutlined style={{ fontSize: "0.875rem" }} />
          </Tooltip>
        )}
      </Flex>
      <Form.Item name={fieldName} noStyle>
        <Radio.Group options={RetentionOptions} />
      </Form.Item>
    </Flex>
  );
};
