import { createContext, useState, useCallback, useMemo } from "react";

export type PopupType = "choice" | "upload" | "people" | "result" | null;

export interface PopupStore {
  back: () => void;
  push: (type: PopupType) => void;
  current: PopupType;
  init: () => void;
}

export const usePopupRouter = (): PopupStore => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [stack, setStack] = useState<PopupType[]>([null]);

  const current = useMemo(() => stack[currentIdx], [stack, currentIdx]);

  const init = useCallback(() => {
    setStack([null]);
    setCurrentIdx(0);
  }, [])

  const back = useCallback(() => {
    if (currentIdx === 0) {
      return;
    }
    setStack(stack.filter((_, i) => i !== currentIdx));
    setCurrentIdx(currentIdx - 1);
  }, [currentIdx, stack]);

  const push = useCallback((type: PopupType) => {
    if (type === null) {
      init();
    }
    setStack([...stack, type]);
    setCurrentIdx(currentIdx + 1);
  }, [init, stack, currentIdx]);

  return {
    init,
    back,
    push,
    current
  }
}

export const PopupContext = createContext<PopupStore>(
  {
    back: () => {return},
    push: (type: PopupType) => {return},
    current: null,
    init: () => {return}
  }
);
