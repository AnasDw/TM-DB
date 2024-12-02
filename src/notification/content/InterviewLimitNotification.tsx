import React, { useCallback } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useRouter } from "next/router";
import { colors } from "../../lib/theme/colors";
import { StyledCol, StyledRow, StyledText } from "../../lib/theme/GlobalStyle";
import { Pages } from "../../utils/routes";
import { useIntervieweeLimitLabels } from "../hooks/useLabels";

interface InterviewLimitProps {
  caseId: string;
  showDescriptionInline?: boolean;
  StyledRowGap: string;
  StyledRowAlign: "top" | "middle" | "bottom" | "stretch";
  buttonSize?: SizeType;
}

const InterviewLimitNotification: React.FC<InterviewLimitProps> = ({
  caseId,
  showDescriptionInline = false,
  StyledRowGap,
  StyledRowAlign,
  buttonSize = "middle",
}) => {
  const router = useRouter();

  const handleUpdateIntervieweeLimit = useCallback(() => {
    router.push(Pages.PROJECT_CREATION(caseId));
  }, [caseId, router]);

  const {
    intervieweeLimitTitle,
    intervieweeLimitDescription,
    intervieweeLimitButtonContent,
  } = useIntervieweeLimitLabels();

  const Icon = (
    <ExclamationCircleFilled
      style={{ color: colors.orange[5], fontSize: "1.5rem" }}
    />
  );

  const Title = (
    <StyledText font_size="1rem">{intervieweeLimitTitle}</StyledText>
  );

  const Description = (
    <StyledText font_size=".875rem" font_weight="400">
      {intervieweeLimitDescription}
    </StyledText>
  );

  return (
    <>
      {showDescriptionInline ? (
        <StyledRow align={StyledRowAlign} wrap={false} gap={StyledRowGap}>
          {Icon}
          <StyledCol gap=".5rem">
            {Title}
            {Description}
          </StyledCol>
        </StyledRow>
      ) : (
        <StyledCol gap=".5rem">
          <StyledRow align={StyledRowAlign} wrap={false} gap={StyledRowGap}>
            {Icon}
            {Title}
          </StyledRow>
          {Description}
        </StyledCol>
      )}
      <Button
        onClick={handleUpdateIntervieweeLimit}
        style={{ maxWidth: "75%" }}
        type="primary"
        size={buttonSize}
      >
        {intervieweeLimitButtonContent}
      </Button>
    </>
  );
};

export default InterviewLimitNotification;
