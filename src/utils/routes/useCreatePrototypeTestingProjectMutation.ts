import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useMutation } from "react-query";
import { logger } from "../../logger/logger";
import {
  projectDraftAtom,
  ProjectDraftState,
  prototypeTestDraftAtom,
  PrototypeTestDraftState,
} from "../../state/atoms";
import apiInstance from "../api";
import { Routes } from "./consts";

type Screen = {
  screenName: string;
  screenExternalImageUrl: string;
  screenExternalId: string;
  specificQuestions: string;
};

type Task = {
  header: string;
  description: string;
  startScreenExternalId: string;
  endScreenExternalId: string;
};

type Link = {
  link: string;
  name?: string;
  versionId?: string;
};

type PrototypeTestingRecord = {
  name: string;
  prototypeLink: Link;
  task: Task;
  specificGuidelines?: string;
  screens: Screen[];
};

type CreatePrototypeTestingProjectPayload = {
  caseId: string;
};

type CreatePrototypeTestingProjectMutationProps = {
  onSuccess: (data: CreatePrototypeTestingProjectPayload) => void;
};

const parsePrototypeTestDraftToRecord = (
  projectDraft: ProjectDraftState,
  prototypeDraft: PrototypeTestDraftState
): PrototypeTestingRecord => ({
  name: projectDraft.name || "",
  prototypeLink: {
    link: prototypeDraft.link?.link || "",
    name: prototypeDraft.metadata.assetName || "",
    versionId: prototypeDraft.metadata.versionId || "",
  },
  task: {
    header: prototypeDraft.task.header || "",
    description: prototypeDraft.task.description || "",
    startScreenExternalId: prototypeDraft.task.startScreen || "",
    endScreenExternalId: prototypeDraft.task.endScreen || "",
  },
  specificGuidelines: prototypeDraft.guidelines || "",
  screens: prototypeDraft.screens.map(({ id, name, url, question }) => ({
    screenName: name,
    screenExternalImageUrl: url,
    screenExternalId: id,
    specificQuestions: question || "",
  })),
});

export const useCreatePrototypeTestingProjectMutation = ({
  onSuccess,
}: CreatePrototypeTestingProjectMutationProps) => {
  const [projectDraft] = useAtom(projectDraftAtom);
  const [prototypeTestDraft] = useAtom(prototypeTestDraftAtom);

  const { mutate: handleCreateProject, isLoading: isCreatingProject } =
    useMutation(
      async () => {
        return (
          await apiInstance.post(
            Routes.MAIN.CREATE_PROTOTYPE_TESTING_PROJECT,
            parsePrototypeTestDraftToRecord(projectDraft, prototypeTestDraft)
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
