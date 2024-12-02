import { useCallback, useState } from "react";

import posthog from "posthog-js";

export const useMicrophone = (isEnabled: boolean = false) => {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(isEnabled);

  const handleMicrophoneChange = useCallback((enabled: boolean) => {
    posthog.capture("Microphone", { enabled });
    setIsMicrophoneOn(enabled);
  }, []);

  return { isMicrophoneOn, handleMicrophoneChange };
};
