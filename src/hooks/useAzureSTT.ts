import { useCallback, useEffect, useRef, useState } from "react";
import { noop } from "lodash";
import { JsonType } from "posthog-js";
import { useFeatureFlagPayload } from "posthog-js/react";
import { MicrophoneMode } from "../features/interview-talking/interfaces";
import { logger } from "../logger/logger";
import { IconTypeEnum } from "../notification/enum";
import { openNotificationWithIcon } from "../notification/openNotificationWithIcon";
import { AzureSTTClient, ListeningStatus } from "../record/AzureSTTClient";
import { OnTranscriptionFinish } from "../record/types";
import { LanguageIso639Set1 } from "../utils/enums/language";

interface UseAzureSTTProps {
  speechToken: string;
  speechRegion: string;
  languageCode: LanguageIso639Set1;
  shouldRecordAudioData?: boolean;
  onFinish: OnTranscriptionFinish;
  onIsListeningChanged?: (isListening: boolean) => void;
  isMicrophoneOn: boolean;
  canRecord: boolean;
  setIsMicrophoneOn: (isMicrophoneOn: boolean) => void;
  endSilenceTimeoutPayloadPTT?: JsonType | undefined;
  microphoneMode: MicrophoneMode;
  handleIsRecording: (isRecording: boolean) => void;
  onRecording?: (text: string) => void;
}

export const useAzureSTT = ({
  speechToken,
  speechRegion,
  languageCode,
  shouldRecordAudioData,
  onFinish,
  onIsListeningChanged,
  isMicrophoneOn,
  canRecord,
  setIsMicrophoneOn,
  endSilenceTimeoutPayloadPTT,
  microphoneMode,
  handleIsRecording,
  onRecording,
}: UseAzureSTTProps) => {
  const [sttClient, setSttClient] = useState<AzureSTTClient>();
  const [recognizerStatus, setRecognizerStatus] = useState(
    ListeningStatus.None
  );

  const canRecordRef = useRef(canRecord);
  const isMicrophoneOnRef = useRef(isMicrophoneOn);
  const endSilenceTimeoutPayload = useFeatureFlagPayload("end-silence-timeout");

  canRecordRef.current = canRecord;
  isMicrophoneOnRef.current = isMicrophoneOn;

  const isLoading =
    (recognizerStatus === ListeningStatus.Starting ||
      recognizerStatus === ListeningStatus.Stopping) &&
    isMicrophoneOn;

  useEffect(() => {
    if (shouldRecordAudioData !== undefined) {
      const newClient = new AzureSTTClient(
        languageCode,
        speechToken,
        speechRegion,
        endSilenceTimeoutPayload || endSilenceTimeoutPayloadPTT,
        shouldRecordAudioData,
        canRecordRef,
        microphoneMode === MicrophoneMode.PTT
      );

      setSttClient(newClient);

      return () => {
        newClient.dispose();
      };
    }

    return noop;
  }, [
    languageCode,
    shouldRecordAudioData,
    speechRegion,
    speechToken,
    microphoneMode,
  ]);

  useEffect(() => {
    sttClient?.setOnFinish(onFinish);
  }, [sttClient, onFinish]);

  useEffect(() => {
    sttClient?.setOnStatusChange((status) => {
      setRecognizerStatus(status);
      onIsListeningChanged?.(status === ListeningStatus.Started);
    });
  }, [sttClient, onIsListeningChanged]);

  useEffect(() => {
    sttClient?.setOnRecording((recordingState) => {
      if (recordingState.isRecording) {
        onRecording?.(recordingState.partialTranscription);
      }

      handleIsRecording(recordingState.isRecording);
    });
  }, [sttClient, onRecording, handleIsRecording]);

  const startContinuousRecognition = useCallback(async () => {
    try {
      await sttClient?.start();
    } catch (error) {
      if (typeof error === "string") {
        logger.error(`Error starting continuous recognition: ${error}`);

        if (error.toLowerCase().includes("permission denied")) {
          openNotificationWithIcon(IconTypeEnum.Error, {
            description:
              "Oops! We couldn't access your microphone. Please enable permissions and refresh the page.",
          });
        }
      }

      throw error;
    }
  }, [sttClient]);

  const stopContinuousRecognition = useCallback(async () => {
    try {
      await sttClient?.stop();
    } catch (error) {
      if (typeof error === "string") {
        logger.error(`Error stopping continuous recognition: ${error}`);
      }

      throw error;
    }
  }, [sttClient]);

  useEffect(() => {
    if (canRecord && isMicrophoneOnRef.current) {
      setRecognizerStatus((currentStatus) =>
        [ListeningStatus.Stopped, ListeningStatus.None].includes(currentStatus)
          ? ListeningStatus.Starting
          : currentStatus
      );
      const timeoutId = setTimeout(() => {
        if (canRecordRef.current && isMicrophoneOnRef.current) {
          startContinuousRecognition().catch(noop);
        }
      }, 300);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    return noop;
  }, [canRecord, startContinuousRecognition]);

  const onAudioClick = async () => {
    try {
      if (isMicrophoneOn) {
        logger.info("onAudioClick - User requested to disable mic");
        await stopContinuousRecognition();
        setIsMicrophoneOn(false);
      } else {
        logger.info("onAudioClick - User requested to enable mic");
        await startContinuousRecognition();
        setIsMicrophoneOn(true);
      }
    } catch (e) {
      logger.error(
        isMicrophoneOn
          ? "Failed to stop microphone"
          : "Failed to start microphone",
        undefined,
        e as Error
      );
    }
  };

  return { sttClient, recognizerStatus, isLoading, onAudioClick };
};
