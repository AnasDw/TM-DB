import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import { useTenant } from "../contexts/TenantContext";
import apiInstance from "../utils/api";

export const useVersionCheck = () => {
  const [isVersionChanged, setIsVersionChanged] = useState<boolean | undefined>(
    undefined
  );
  const { currentTenant } = useTenant();

  const VERSION_KEY = `${currentTenant}_VERSION`;

  const { data: currentVersion, isLoading } = useQuery<
    unknown,
    unknown,
    string
  >(
    `/version`,
    async () => {
      const response = await apiInstance.get("/version");
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (isLoading) {
      return;
    }

    if (currentVersion && currentVersion !== storedVersion) {
      localStorage.setItem(VERSION_KEY, currentVersion);
      setIsVersionChanged(true);
    } else {
      setIsVersionChanged(false);
    }
  }, [currentVersion, isLoading]);

  return { isVersionChanged };
};
