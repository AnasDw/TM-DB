import { useMemo } from "react";

const providers = [
  { name: "instagram", identifiers: ["instagram"] },
  { name: "facebook", identifiers: ["fban", "fbav", "fb_iab"] },
];

export const useInAppProvider = () => {
  const isInApp = useMemo(() => !navigator.mediaDevices, []);

  const inAppProvider = useMemo(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const activeProvider = providers.find((provider) =>
      provider.identifiers.some((identifier) => userAgent.includes(identifier))
    );

    return activeProvider ? activeProvider.name : null;
  }, []);

  return { isInApp, inAppProvider };
};
