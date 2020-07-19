import { useMemo } from 'react';
import useToggle from '../useToggle';

export interface IToggleBooleanActions {
  toggle: (value?: any) => void;
  setTrue: () => void;
  setFalse: () => void;
}

export default function useBoolean(
  defaultVal = false
): [boolean, IToggleBooleanActions] {
  const [value, { toggle }] = useToggle(defaultVal);

  const actions = useMemo(() => {
    const setFalse = () => toggle(false);
    const setTrue = () => toggle(true);
    return {
      toggle,
      setFalse,
      setTrue,
    };
  }, [toggle]);

  return [value, actions];
}
