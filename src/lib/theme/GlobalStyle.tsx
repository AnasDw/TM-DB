import { InfoCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import styled from "styled-components";

import { colors } from "./colors";

const { Text } = Typography;

export const StyledText = styled(Text)<{
  font_color?: string;
  font_size?: string;
  font_weight?: string;
}>`
  color: ${({ font_color }) => font_color};
  font-weight: ${({ font_weight }) => font_weight || "500"};
  font-size: ${({ font_size }) => font_size || ".75rem"};
`;

export const SecondaryText = styled(StyledText)<{
  font_size?: string;
  font_weight?: string;
}>`
  color: ${colors.grey[3]};
`;

export const StyledCardContainer = styled(Card)`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
`;
export const StyledCol = styled(Col)<{
  gap?: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
`;
export const StyledRow = styled(Row)<{
  gap?: string;
}>`
  gap: ${({ gap }) => gap};
`;
export const CenterStyledCol = styled(StyledCol)`
  justify-content: center;
  align-items: center;
`;
export const StyledDivColumn = styled.div<{
  gap: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
`;

export const CenteredButton = styled(Button)`
  display: flex;
  align-items: center;
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledIcon = styled(Row)<{
  font_size: string;
  color: string;
}>`
  font-size: ${({ font_size }) => font_size};
  color: ${({ color }) => color};
`;

export const StyledButton = styled(Button)<{ color?: string }>`
  color: ${({ color }) => color || colors.purple.primary};
`;

export const StyledInfoCircleOutlined = styled(InfoCircleOutlined)`
  color: ${colors.grey[3]};
  font-size: 1rem;
`;

export const StyledInfoCircleFilled = styled(InfoCircleFilled)<{
  color?: string;
  fontSize?: string;
}>`
  color: ${({ color }) => color || colors.purple.primary};
  font-size: ${({ fontSize }) => fontSize || "1rem"};
`;

export const PaddedStyledRow = styled(StyledRow)<{ padding: string }>`
  padding: ${({ padding }) => padding} !important;
`;

export const StyledColPadding = styled(StyledCol)<{
  padding?: string;
}>`
  padding: ${({ padding }) => padding || "0"} !important;
`;

export const RowOverflow = styled(Row)`
  overflow-y: auto;
`;
export const StyledMessage = styled(Row)<{
  background_color: string;
}>`
  background-color: ${({ background_color }) => background_color};
  padding: 1rem;
  border-radius: 0.5rem;
  width: fit-content;
  cursor: default;
`;
