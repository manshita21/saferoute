import { useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const initial = useMemo(() => readStorage<T>(key, initialValue), [key, initialValue]);
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

