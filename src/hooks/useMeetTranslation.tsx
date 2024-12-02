import { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { TranslationResponse } from "../interfaces";
import apiInstance from "../utils/api";
import { LanguageIso639Set1 } from "../utils/enums/language";
import { BackgroundDependentTaskStatus } from "../utils/enums/taskDependentPayload";
import { Routes } from "../utils/routes";

export const useMeetTranslation = (interviewId: string) => {
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  const {
    data: translatedData,
    isLoading: isLoadingTranslatedData,
    refetch: refetchTranslatedData,
  } = useQuery<TranslationResponse>(
    Routes.MAIN.GET_TRANSLATED_MESSAGES(interviewId, LanguageIso639Set1.en),
    async () => {
      return (
        await apiInstance.get(
          Routes.MAIN.GET_TRANSLATED_MESSAGES(
            interviewId,
            LanguageIso639Set1.en
          )
        )
      ).data;
    },
    {
      enabled: Boolean(interviewId),
      refetchOnWindowFocus: false,
      refetchInterval: (data) => (data?.isTaskLoading ? 2000 : false),
    }
  );

  useEffect(() => {
    setShowTranslation(false);
  }, [interviewId]);

  return {
    setShowTranslation,
    showTranslation,
    taskStatus: translatedData?.taskStatus,
    isLoadingTranslatedData:
      isLoadingTranslatedData || translatedData?.isTaskLoading,
    refetchTranslatedData,
    translatedData: translatedData?.payload,
    showTranslationButton:
      translatedData?.taskStatus === BackgroundDependentTaskStatus.SUCCESS,
  };
};
