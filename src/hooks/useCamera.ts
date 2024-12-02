import { useCallback, useState } from "react";

import posthog from "posthog-js";

export const useCamera = (isEnabled: boolean = false) => {
  const [isCameraEnabled, setIsCameraEnabled] = useState(isEnabled);

  const handleCameraChange = useCallback((enabled: boolean) => {
    posthog.capture("Camera", { enabled });
    setIsCameraEnabled(enabled);
  }, []);

  return { isCameraEnabled, handleCameraChange };
};
