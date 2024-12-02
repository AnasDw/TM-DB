import { useCallback, useState } from "react";

import { useMutation } from "react-query";

import apiInstance, { REQUESTS_RETRY_NUMBER } from "../utils/api";
import { MeetMode } from "../utils/mode";

interface IUseVoiceLoader {
  meetMode: MeetMode;
  caseId: string;
  isAvatarMode: boolean;
  isAvatarFTEnabled: boolean;
  interviewerVoice: string;
}

type Voice = Blob;
type Transcription = string;
type LoadedVoice = Record<Transcription, Voice>;

const useVoiceLoader = ({
  meetMode,
  caseId,
  isAvatarFTEnabled,
  isAvatarMode,
  interviewerVoice,
}: IUseVoiceLoader) => {
  const [voices, setVoices] = useState<LoadedVoice>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingFirstVoice, setIsLoadingFirstVoice] =
    useState<boolean>(false);

  const { mutateAsync: loadVoiceTemp } = useMutation<
    { transcription: Transcription; voice: Voice },
    any,
    { transcription: Transcription; meetId: string },
    any
  >(
    async ({ transcription, meetId }) => {
      if (meetMode === MeetMode.Typing) {
        return { transcription: "typing-mode", voice: null };
      }

      if (isAvatarFTEnabled && isAvatarMode) {
        const { data } = await apiInstance.post("/meet/voice-avatar", {
          transcription,
          caseId,
          meetId,
        });

        return { transcription, voice: data };
      }

      const { data } = await apiInstance.post(
        "/meet/voice",
        {
          meetId,
          transcription,
          caseId,
          interviewerVoice,
        },
        { responseType: "blob" }
      );

      return { transcription, voice: data };
    },
    {
      retry: REQUESTS_RETRY_NUMBER,
      onSuccess: ({ transcription, voice }) => {
        setVoices((prev) => ({ ...prev, [transcription]: voice }));
      },
    }
  );

  const loadVoices = useCallback(
    async ({
      transcriptions,
      meetId,
    }: {
      transcriptions: string[];
      meetId: string;
    }) => {
      setIsLoading(true);
      setIsLoadingFirstVoice(true);
      await Promise.all(
        transcriptions.map(async (transcription, index) => {
          await loadVoiceTemp({ transcription, meetId });

          if (index === 0) {
            setIsLoadingFirstVoice(false);
          }
        })
      );
      setIsLoading(false);
    },
    []
  );

  return { loadVoices, voices, isLoading, isLoadingFirstVoice };
};

export default useVoiceLoader;
