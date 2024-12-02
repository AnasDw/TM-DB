import { useEffect, useState } from "react";

import { Optional } from "../lib/utilities/typeUtilities";

export function useStorage(key: string) {
  const [value, setValue] = useState<Optional<string>>();

  const load = (): Optional<string> => {
    const storageValue = window.localStorage.getItem(key) || undefined;
    setValue(storageValue);
    return storageValue;
  };

  const set = (newValue: Optional<string> = undefined) => {
    if (!newValue) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, newValue);
      setValue(newValue);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return [value, set, load] as const;
}
