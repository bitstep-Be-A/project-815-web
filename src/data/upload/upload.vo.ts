import { atom } from "recoil";

import { GenderType, ResponseState } from "../types";

export interface ReservedImageVO {
  readonly personId: number;
  readonly gender: GenderType;
  readonly myPosition: number;
  readonly labelNum: number;
  readonly imageUrl: string;
}

export const ReservedImageResponseState = atom<ResponseState<ReservedImageVO>>({
  key: "atom/BaseImage",
  default: {
    loading: true,
    fetched: true
  }
});

export interface ConvertedImageVO {
  readonly images: string[];
  readonly parameters: object;
  readonly info: string;
}

export const ConvertedImageResponseState = atom<ResponseState<ConvertedImageVO>>({
  key: "atom/ConvertedImage",
  default: {
    loading: false,
    fetched: false,
  }
});
