import { useCallback, useEffect, useState } from "react";

import posthog from "posthog-js";

export const useIntervieweeRecording = (
  initialIsRecording: boolean = false
) => {
  const [isRecording, setIsRecording] = useState(initialIsRecording);

  const handleIsRecording = useCallback((recording: boolean) => {
    setIsRecording(recording);
  }, []);

  useEffect(() => {
    posthog.capture("Recording", { enabled: isRecording });
  }, [isRecording]);

  return { isRecording, handleIsRecording };
};
