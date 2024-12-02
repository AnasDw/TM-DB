import { useEffect, useState } from "react";

import { useFeatureFlagEnabled } from "posthog-js/react";

export default function usePosthogFeatureFlag(
  featureFlagKey: string,
  fallbackValue: boolean,
  timeoutMs: number = 10_000
) {
  const isEnabled = useFeatureFlagEnabled(featureFlagKey);
  const [value, setValue] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (isEnabled !== undefined) {
      setValue(isEnabled);
    }
  }, [isEnabled]);

  useEffect(() => {
    if (value === undefined) {
      const toClear = setTimeout(() => {
        setValue(fallbackValue);
      }, timeoutMs);

      return () => {
        clearTimeout(toClear);
      };
    }

    return () => {};
  }, [value, timeoutMs, fallbackValue]);

  return value;
}
