import { useEffect } from "react";

import { useQuery } from "react-query";
import { MeetMessageDTO, TranscriptMetadata } from "../interfaces";
import apiInstance, { meetingServiceInstance } from "../utils/api";
import { MeetMode } from "../utils/mode";

interface UseGetConversation {
  interviewId: string;
  interviewMode: string;
  isAudioRecorded: boolean;
}
export const useGetConversation = ({
  interviewId,
  interviewMode,
  isAudioRecorded,
}: UseGetConversation) => {
  const { data, isLoading, refetch } = useQuery<
    unknown,
    unknown,
    { count_tagged_messages: number; new_messages: MeetMessageDTO[] }
  >(
    `getConversation/${interviewMode}`,
    async () => {
      return (await apiInstance.get(`/meet/conversation/${interviewId}`)).data;
    },
    {
      enabled: interviewMode === MeetMode.Typing || !isAudioRecorded,
    }
  );

  const {
    data: talkingData,
    isLoading: isLoadingTalking,
    refetch: refetchTalking,
  } = useQuery<unknown, unknown, TranscriptMetadata>(
    `/meetings/${interviewId}/recording/metadata`,
    async () => {
      return meetingServiceInstance
        .get(`/meetings/${interviewId}/recording/metadata`)
        .then((response) => response.data);
    },
    {
      enabled: interviewMode === MeetMode.Talking && isAudioRecorded,
    }
  );

  useEffect(() => {
    if (interviewMode === MeetMode.Talking && isAudioRecorded) {
      refetchTalking();
    } else refetch();
  }, [interviewId, refetch, refetchTalking, isAudioRecorded, interviewMode]);

  return {
    conversationData:
      interviewMode === MeetMode.Talking && isAudioRecorded
        ? talkingData
        : data,
    isLoading:
      interviewMode === MeetMode.Talking && isAudioRecorded
        ? isLoadingTalking
        : isLoading,
    invalidate:
      interviewMode === MeetMode.Talking && isAudioRecorded
        ? refetchTalking
        : refetch,
  };
};
