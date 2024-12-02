import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useMutation } from "react-query";
import { ProjectStepInterface } from "../../interfaces";
import { logger } from "../../logger/logger";
import { projectDraftAtom, ProjectDraftState } from "../../state/atoms";
import apiInstance from "../api";
import { Routes } from "./consts";

type CreateProjectMutationPayload = {
  caseId: string;
};

type CreateProjectMutationProps = {
  onSuccess: (data: CreateProjectMutationPayload) => void;
  projectProgress: ProjectStepInterface[];
};

type StepValue = {
  step_id: ProjectStepInterface["step_id"];
  text: ProjectStepInterface["text"];
};

type NewInterviewRecord = {
  name?: string;
  steps: StepValue[];
};

const parseInterviewDraftToRecord = (
  projectDraft: ProjectDraftState,
  projectProgress: ProjectStepInterface[]
): NewInterviewRecord => ({
  name: projectDraft.name,
  steps: projectProgress.map(({ step_id, text }) => ({ step_id, text })),
});

export const useCreateProjectMutation = ({
  onSuccess,
  projectProgress,
}: CreateProjectMutationProps) => {
  const [projectDraft] = useAtom(projectDraftAtom);

  const { mutate: handleCreateProject, isLoading: isCreatingProject } =
    useMutation(
      async () => {
        return (
          await apiInstance.post(
            Routes.MAIN.CREATE_PROJECT_V1,
            parseInterviewDraftToRecord(projectDraft, projectProgress)
          )
        ).data;
      },
      {
        onSuccess,
        onError: (error: AxiosError) => {
          logger.error("Couldn't create a project", error);
        },
      }
    );

  return {
    isCreatingProject,
    handleCreateProject,
  };
};
