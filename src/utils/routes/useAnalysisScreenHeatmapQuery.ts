import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { logger } from "../../logger/logger";
import apiInstance from "../api";
import { HTTP_STATUS_CODE } from "../consts";
import { Routes } from "./consts";

type AnalysisScreenHeatmapQueryProps = {
  screenId: string;
};

type AnalysisScreenHeatmapQueryResult = {
  image: Blob;
  metadata?: ImageMetadata;
};

export type ImageMetadata = {
  containsHeatmap: boolean;
};

export const useAnalysisScreenHeatmapQuery = ({
  screenId,
}: AnalysisScreenHeatmapQueryProps) => {
  const { data: heatmapBlob, isLoading: isLoadingHeatmapBlob } = useQuery<
    AnalysisScreenHeatmapQueryResult,
    AxiosError
  >(
    Routes.MAIN.GET_USABILITY_TESTING_SCREEN_HEATMAP(screenId),
    async () => {
      const response = await apiInstance.get(
        Routes.MAIN.GET_USABILITY_TESTING_SCREEN_HEATMAP(screenId),
        {
          responseType: "blob",
        }
      );

      const metadata = {
        containsHeatmap: response.status !== HTTP_STATUS_CODE.NO_CONTENT,
      };

      return {
        image: response.data,
        metadata,
      };
    },
    {
      onError: (error: AxiosError) => {
        logger.error(
          `Error fetching usability testing screen: ${screenId} heatmap`,
          error
        );
      },
    }
  );

  return { heatmapBlob, isLoadingHeatmapBlob };
};
