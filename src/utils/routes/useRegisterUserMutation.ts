import { useAuth0 } from "@auth0/auth0-react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { logger } from "../../logger/logger";
import { workspaceServiceInstance } from "../api";
import { Routes } from "./consts";

type RegisterUserResult = {
  tenantId: string;
};

export const useRegisterUserMutation = () => {
  const { getAccessTokenSilently } = useAuth0();

  const {
    mutateAsync: registerUser,
    isLoading: isRegisteringUser,
    data: registrationResult,
  } = useMutation(
    async () => {
      const response = await workspaceServiceInstance.post<RegisterUserResult>(
        Routes.WORKSPACE.REGISTER_NEW_USER
      );
      await getAccessTokenSilently({
        cacheMode: "off",
      });

      return response.data;
    },
    {
      onError: (error: AxiosError) => {
        logger.error("Error registering user", error);
      },
      retry: 3,
    }
  );

  return {
    registerUser,
    isRegisteringUser,
    registrationResult,
  };
};
