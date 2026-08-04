import { useCallback, useState } from "react";
import { generatePassword } from "../utils/passwordGenerator";

const DEFAULT_OPTIONS = {
  length: 16,
  upper: true,
  lower: true,
  number: true,
  symbol: true,
};

export function useGenerator() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [password, setPassword] = useState(() =>
    generatePassword(DEFAULT_OPTIONS),
  );

  const regenerate = useCallback(
    (nextOptions = options) => {
      setPassword(generatePassword(nextOptions));
    },
    [options],
  );

  const updateOption = useCallback((key, value) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: value };

      const anyTypeOn = next.upper || next.lower || next.number || next.symbol;
      if (!anyTypeOn) return prev;
      setPassword(generatePassword(next));
      return next;
    });
  }, []);

  return { password, options, updateOption, regenerate };
}
