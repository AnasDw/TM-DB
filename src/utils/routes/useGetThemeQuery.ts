import { useQuery } from "react-query";
import { ThemeDataTask } from "../../features/admin-panel/theme-finder-tab/interfaces";
import { sortThemeTopic } from "../../features/admin-panel/theme-finder-tab/utils/functions";
import { queryClient } from "../../pages/_app";
import apiInstance from "../api";
import { Routes } from "./consts";

type GetThemeQueryProps = {
  themeId?: string;
  caseId: string;
};

export const useGetThemeQuery = ({
  themeId = "",
  caseId,
}: GetThemeQueryProps) => {
  const {
    data: themeData,
    isLoading: isLoadingTheme,
    error: themeError,
    refetch: refetchTheme,
  } = useQuery<ThemeDataTask, Error>(
    Routes.MAIN.GET_THEME(themeId),
    async () => {
      const tempThemeData: ThemeDataTask = (
        await apiInstance.get(Routes.MAIN.GET_THEME(themeId))
      ).data;

      if (tempThemeData.payload) {
        tempThemeData.payload.related_topics.sort(sortThemeTopic);
      }

      return tempThemeData;
    },
    {
      refetchInterval: (data) =>
        data?.isTaskLoading ||
        data?.payload.related_topics.some(
          (topic) => topic.custom_data?.status.isLoading
        )
          ? 3_000
          : false,
      enabled: Boolean(themeId),
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (!data.isTaskLoading) {
          queryClient.invalidateQueries(Routes.MAIN.GET_THEMES(caseId));
        }
      },
    }
  );

  return { themeData, isLoadingTheme, themeError, refetchTheme };
};
