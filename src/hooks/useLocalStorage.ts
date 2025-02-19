import { setLocalStorage } from "@/features/Workflow/utils";
import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, data: T[]) => {
  const [value, setValue] = useState<T[]>(data);

  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
