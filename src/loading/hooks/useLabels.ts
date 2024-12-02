import { useMemo } from "react";
import dictionary from "../../dictionary";

export const useUserRegistrationLoaderLabels = () =>
  useMemo(() => {
    const {
      app: {
        loaders: {
          user_registration: {
            steps: {
              workspace_setup: workspaceSetup,
              workspace_data: workspaceData,
              finish_setup: finishSetup,
            },
          },
        },
      },
    } = dictionary;

    return {
      workspaceSetup,
      workspaceData,
      finishSetup,
    };
  }, []);
