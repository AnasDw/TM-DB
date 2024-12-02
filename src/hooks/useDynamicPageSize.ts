import { useCallback } from "react";
import useLocalStorageState from "use-local-storage-state";

const DYNAMIC_STORAGE_KEYS = "DYNAMIC_STORAGE_KEYS";

const useDynamicPageSize = ({
  initialPageSize,
  pageKey,
}: {
  initialPageSize: number;
  pageKey: string;
}) => {
  const [pageSizes, setPageSizes] = useLocalStorageState<
    Record<string, number>
  >(DYNAMIC_STORAGE_KEYS, {
    defaultValue: {},
  });

  const dynamicPageSize = pageSizes[pageKey] || initialPageSize;

  const saveUserPageSize = useCallback(
    (size: number) => {
      setPageSizes((prevPageSizes) => ({
        ...prevPageSizes,
        [pageKey]: size,
      }));
    },
    [pageKey, setPageSizes]
  );

  return { dynamicPageSize, saveUserPageSize };
};

export default useDynamicPageSize;
