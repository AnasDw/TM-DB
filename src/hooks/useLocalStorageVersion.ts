import { Dispatch, SetStateAction, useEffect } from "react";

import useLocalStorageState, {
  LocalStorageState,
} from "use-local-storage-state";

import { useVersionCheck } from "./useVersionCheck";

type LocalStorageVersion<T> = [
  T,
  Dispatch<SetStateAction<T>>,
  LocalStorageState<T>[2] & { isLoading: boolean }
];

export const useLocalStorageVersion = <T>(
  key: string,
  defaultValue: T
): LocalStorageVersion<T> => {
  const { isVersionChanged } = useVersionCheck();

  const localStorageState = useLocalStorageState<T>(key, {
    defaultValue,
  });

  const [data, setData, allOptions] = localStorageState;

  useEffect(() => {
    if (isVersionChanged) {
      allOptions.removeItem();
    }
  }, [isVersionChanged]);

  if (isVersionChanged === undefined) {
    return [defaultValue, setData, { ...allOptions, isLoading: true }];
  }

  return [data, setData, { ...allOptions, isLoading: false }];
};
