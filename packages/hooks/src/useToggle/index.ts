import { useState, useMemo } from 'react';

type ToggleType = string | number | boolean | undefined;

export interface IToggleActions<T = ToggleType> {
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
}

function useToggle<T = boolean | undefined>(): [boolean, IToggleActions<T>];
function useToggle<T = ToggleType>(defaultVal: T): [T, IToggleActions<T>];
function useToggle<T = ToggleType, R = ToggleType>(defaultVal: T, reverseVal: R): [T | R, IToggleActions<T | R>];
function useToggle<T extends ToggleType = ToggleType, R extends ToggleType = ToggleType>(
  defaultVal: T = false as T,
  reverseVal?: R,
) {
  const [val, setVal] = useState<T | R>(defaultVal);

  const reverseValue = (reverseVal === undefined ? !defaultVal : reverseVal) as T | R;

  const actions = useMemo(() => {
    const toggle = (value?: T | R) => {
      if (value !== undefined) {
        setVal(value);
        return;
      }
      setVal((s) => (s === defaultVal ? reverseValue : defaultVal));
    };

    const setLeft = () => setVal(defaultVal);
    const setRight = () => setVal(reverseValue);
    return {
      setLeft,
      setRight,
      toggle,
    };
  }, [setVal, defaultVal, reverseValue]);

  return [val, actions];
}

export default useToggle;
