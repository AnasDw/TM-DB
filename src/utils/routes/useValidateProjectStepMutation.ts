import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { logger } from "../../logger/logger";
import apiInstance from "../api";
import { ProjectCreationStepEnum } from "../enums";
import { Routes } from "./consts";

type ValidateProjectStepMutationProps = {
  onSuccess: (data: any) => void;
  name?: ProjectCreationStepEnum;
  text?: string;
};

export const useValidateProjectStepMutation = ({
  onSuccess,
  name,
  text,
}: ValidateProjectStepMutationProps) => {
  const { isLoading: isValidatingStep, mutate: handleValidateStep } =
    useMutation(
      async () => {
        return (
          await apiInstance.post(Routes.MAIN.VALIDATE_PROJECT_STEP, {
            stepKey: name,
            text,
          })
        ).data;
      },
      {
        onSuccess,
        onError: (error: AxiosError) => {
          logger.error("Error validating project creation step", error);
        },
        retry: 2,
      }
    );

  return {
    isValidatingStep,
    handleValidateStep,
  };
};
