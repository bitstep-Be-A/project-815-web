import { createContext, useState, useCallback, useMemo } from "react";

export type RouteType = "choice" | "upload" | "people" | "loading" | null;

export interface RouterStore {
  back: () => void;
  push: (type: RouteType) => void;
  current: RouteType;
  init: () => void;
  action?: "BACK" | "PUSH" | undefined;
  slider: string;
  setSlider: (slider: string) => void;
}

export const useRouter = (): RouterStore => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [stack, setStack] = useState<RouteType[]>([null]);
  const [action, setAction] = useState<"BACK" | "PUSH" | undefined>();
  const [slider, setSlider] = useState<string>("");

  const current = useMemo(() => stack[currentIdx], [stack, currentIdx]);

  const init = useCallback(() => {
    setStack([null]);
    setCurrentIdx(0);
    setAction(undefined);
    setSlider("");
  }, [])

  const back = useCallback(() => {
    if (currentIdx === 0) {
      return;
    }
    setStack(stack.filter((_, i) => i !== currentIdx));
    setCurrentIdx(currentIdx - 1);
    setAction("BACK");
    setSlider("");
  }, [currentIdx, stack]);

  const push = useCallback((type: RouteType) => {
    if (type === null) {
      init();
    }
    setStack([...stack, type]);
    setCurrentIdx(currentIdx + 1);
    setAction("PUSH");
    setSlider("");
  }, [init, stack, currentIdx]);

  return {
    init,
    back,
    push,
    current,
    action,
    slider,
    setSlider
  }
}

export const RouterContext = createContext<RouterStore>(
  {
    back: () => {return},
    push: (type: RouteType) => {return},
    current: null,
    init: () => {return},
    slider: "",
    setSlider: () => {return}
  }
);
