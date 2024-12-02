import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { logger } from "../../logger/logger";
import { PrototypeScreenState } from "../../state/atoms";
import apiInstance from "../api";
import { Routes } from "./consts";

type FigmaScreenFragment = {
  figmaNodeId: string;
  imageUrl: string;
  name: string;
};

type FigmaScreensPayload = {
  screens: FigmaScreenFragment[];
  name: string;
  versionId: string;
};

type ParsedLinkPreviewResult = {
  screens: PrototypeScreenState[];
  name: string;
  versionId: string;
};

type LoadPrototypeScreensMutationProps = {
  onSuccess: (data: ParsedLinkPreviewResult) => void;
  onError: (error: AxiosError) => void;
};

type LoadPrototypeScreensMutationBody = {
  prototypeLink: string;
};

const parseFigmaScreensPayload = (
  payload: FigmaScreensPayload
): ParsedLinkPreviewResult => ({
  screens: payload.screens.map(({ figmaNodeId, imageUrl, name }) => ({
    id: figmaNodeId,
    name,
    url: imageUrl,
  })),
  name: payload.name || "",
  versionId: payload.versionId,
});

export const useLoadPrototypeScreensMutation = ({
  onSuccess,
  onError,
}: LoadPrototypeScreensMutationProps) => {
  const { mutate: loadScreens, isLoading: isLoadingScreens } = useMutation(
    async (prototypeLink: string) => {
      return (
        await apiInstance.post(Routes.MAIN.PREVIEW_PROTOTYPE_LINK, {
          prototypeLink,
        } as LoadPrototypeScreensMutationBody)
      ).data as FigmaScreensPayload;
    },
    {
      onSuccess: (data) => {
        onSuccess(parseFigmaScreensPayload(data));
      },
      onError: (error: AxiosError) => {
        onError(error);
        logger.error("Couldn't load prototype screens", error);
      },
    }
  );

  return {
    isLoadingScreens,
    loadScreens,
  };
};
