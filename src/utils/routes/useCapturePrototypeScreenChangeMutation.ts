import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { logger } from "../../logger/logger";
import { meetingServiceInstance } from "../api";
import { Routes } from "./consts";

type CapturePrototypeScreenChangeMutationProps = {
  isDraftMeet: boolean;
  meetId: string;
  caseId: string;
  eventId: string;
};

export type ScreenProgression = {
  prevScreenId: string | null;
  currentScreenId: string | null;
};

type CaptureScreenChangeResult = {
  screenChangeId: string;
};

export const useCapturePrototypeScreenChangeMutation = ({
  isDraftMeet,
  meetId,
  caseId,
  eventId,
}: CapturePrototypeScreenChangeMutationProps) => {
  const { isLoading: isCapturingScreenChange, mutate: captureScreenChange } =
    useMutation(
      async ({ prevScreenId, currentScreenId }: ScreenProgression) => {
        return (
          await meetingServiceInstance.post(
            Routes.MEETING.CAPTURE_SCREEN_CHANGE(meetId),
            {
              prevScreenId,
              currentScreenId,
              isDraftMeet,
              caseId,
              userTimestamp: new Date().toISOString(),
              eventId,
            }
          )
        ).data as CaptureScreenChangeResult;
      },
      {
        onError: (error: AxiosError) => {
          logger.error("Error capturing prototype screen change", error);
        },
      }
    );

  return {
    isCapturingScreenChange,
    captureScreenChange,
  };
};
