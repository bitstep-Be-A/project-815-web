export type GenderType = "M" | "F";

export interface ResponseState<V> {
  data?: V;
  loading: boolean;
  fetched: boolean;
  error?: object | string;
}
