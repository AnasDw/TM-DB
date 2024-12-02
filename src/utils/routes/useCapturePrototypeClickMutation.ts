import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { logger } from "../../logger/logger";
import { meetingServiceInstance } from "../api";
import { Routes } from "./consts";

type CaptureFigmaPosition = {
  x: number;
  y: number;
  presentedNodeId: string;
  handled: boolean;
};

type CapturePrototypeClickMutationProps = {
  onSuccess: (clickId: string) => void;
  screensMapping: Record<string, string>;
  isDraftMeet: boolean;
  meetId: string;
  caseId: string;
  eventId: string;
};

type CaptureClickResult = {
  clickId: string;
};

export const useCapturePrototypeClickMutation = ({
  onSuccess,
  screensMapping,
  isDraftMeet,
  meetId,
  caseId,
  eventId,
}: CapturePrototypeClickMutationProps) => {
  const { isLoading: isCapturingClick, mutate: captureClick } = useMutation(
    async (data: CaptureFigmaPosition) => {
      const screenId = screensMapping[data.presentedNodeId];

      return (
        await meetingServiceInstance.post(
          Routes.MEETING.CAPTURE_CLICK(meetId),
          {
            ...data,
            isDraftMeet,
            caseId,
            eventId,
            screenId,
            userTimestamp: new Date().toISOString(),
          }
        )
      ).data as CaptureClickResult;
    },
    {
      onSuccess: (data: CaptureClickResult) => {
        onSuccess(data.clickId);
      },
      onError: (error: AxiosError) => {
        logger.error("Error capturing prototype click", error);
      },
    }
  );

  return {
    isCapturingClick,
    captureClick,
  };
};
