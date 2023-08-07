import { atom } from "recoil";

import { ResponseState } from "../types";

export interface PersonVO {
  readonly id: number;
  readonly name: string;
  readonly popularity: number;
  readonly keyword: string;
  readonly imageUrl: string;
  readonly story: string;
  readonly isActive: boolean;
}

export const PersonResponseState = atom<ResponseState<PersonVO>>({
  key: "atom/Person",
  default: {
    loading: true,
    fetched: true
  }
});
