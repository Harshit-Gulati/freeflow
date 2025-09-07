import { useEffect, useState } from "react";

export const useDebounce = (inputValue: any, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] =
    useState<typeof inputValue>(inputValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => clearTimeout(timerId);
  }, [inputValue, delay]);

  return debouncedValue;
};
