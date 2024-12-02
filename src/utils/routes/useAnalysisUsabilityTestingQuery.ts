import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { logger } from "../../logger/logger";
import apiInstance from "../api";
import { Routes } from "./consts";

type AnalysisUsabilityTestingQueryProps = {
  caseId: string;
};

export type ScreenStats = {
  name: string;
  averageTestDurationInSeconds: number;
  misClickRate: number;
  usabilityScoreRate: number;
  imageUrl: string;
  id: string;
};

type AnalysisUsabilityTestingQueryResult = {
  testStats: {
    directSuccessRate: number;
    taskUnfinishedRate: number;
    misClickRate: number;
    averageTestDurationInSeconds: number;
  };
  screensStats: ScreenStats[];
};

type GetUsabilityTestingScreenStats = {
  name: string;
  misclickRate: number;
  averageDuration: number;
  usabilityScoreRate: number;
  imageUrl?: string;
  id: string;
};

type GetUsabilityTestingResultPayload = {
  testStats: {
    completedTasksRate: number;
    unfinishedTasksRate: number;
    misclickRate: number;
    averageDuration: number;
  };
  screensStats: GetUsabilityTestingScreenStats[];
};

export const useAnalysisUsabilityTestingQuery = ({
  caseId,
}: AnalysisUsabilityTestingQueryProps) => {
  const {
    data: usabilityTestingStats,
    isLoading: isLoadingUsabilityTestingStats,
  } = useQuery<AnalysisUsabilityTestingQueryResult, AxiosError>(
    Routes.MAIN.GET_USABILITY_TESTING_STATISTICS(caseId),
    async () => {
      const resultPayload = (
        await apiInstance.get(
          Routes.MAIN.GET_USABILITY_TESTING_STATISTICS(caseId)
        )
      ).data as GetUsabilityTestingResultPayload;

      return {
        testStats: {
          directSuccessRate: resultPayload.testStats.completedTasksRate,
          taskUnfinishedRate: resultPayload.testStats.unfinishedTasksRate,
          misClickRate: resultPayload.testStats.misclickRate,
          averageTestDurationInSeconds: resultPayload.testStats.averageDuration,
        },
        screensStats: resultPayload.screensStats.map((screen) => ({
          name: screen.name,
          misClickRate: screen.misclickRate,
          averageTestDurationInSeconds: screen.averageDuration,
          usabilityScoreRate: screen.usabilityScoreRate,
          imageUrl: screen.imageUrl || "",
          id: screen.id,
        })),
      };
    },
    {
      onError: (error: AxiosError) => {
        logger.error("Error fetching usability testing statistics", error);
      },
    }
  );

  return { usabilityTestingStats, isLoadingUsabilityTestingStats };
};
