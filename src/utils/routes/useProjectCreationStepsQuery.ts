import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ProjectStepInterface } from "../../interfaces";
import { logger } from "../../logger/logger";
import apiInstance from "../api";
import { Routes } from "./consts";

type ProjectCreationStepsQueryProps = {
  enabled?: boolean;
};

export const useProjectCreationStepsQuery = ({
  enabled = false,
}: ProjectCreationStepsQueryProps) => {
  const { data } = useQuery<ProjectStepInterface[], AxiosError>(
    Routes.MAIN.GET_PROJECT_CREATION_STEPS,
    async () => {
      return (await apiInstance.get(Routes.MAIN.GET_PROJECT_CREATION_STEPS))
        .data.project_creation_steps;
    },
    {
      onError: (error: AxiosError) => {
        logger.error("Error fetching project creation steps", error);
      },
      enabled,
      refetchOnWindowFocus: false,
    }
  );

  return { data };
};
