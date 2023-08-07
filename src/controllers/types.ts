import { ResponseState } from "../data/types";

export interface DataController<D, V> {
  items: V[];
  dataState: ResponseState<V>;
  init?: () => void;
  add: (data: D) => Promise<void>;
  modify: (data: D, key: any) => Promise<void>;
  remove: (key: any) => Promise<void>;
}
