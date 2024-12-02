import { Card, Form } from "antd";
import styled from "styled-components";

export const StyledFormItem = styled(Form.Item)`
  height: 100%;
  flex-grow: 1;
  display: flex;
  overflow: hidden;

  .ant-row,
  .ant-col,
  .ant-form-item-control-input,
  .ant-form-item-control-input-content {
    flex-grow: 1;
    height: 100%;
    display: flex;
    overflow: hidden;
  }
`;

export const StyledCard = styled(Card)`
  height: 100%;
  max-height: 45vh;
  display: flex;
  overflow: hidden;

  .ant-card-body {
    padding: 32px 24px;
    width: 100%;
    display: flex;
    overflow: hidden;
  }
`;
