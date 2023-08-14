import { atom } from "recoil";

import { GenderType, ResponseState } from "../types";

export interface ReservedImageVO {
  readonly personId: number;
  readonly gender: GenderType;
  readonly myPosition: number;
  readonly labelNum: number;
  readonly category?: "real" | "cartoon";
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
  readonly image: string
}

export const ConvertedImageResponseState = atom<ResponseState<ConvertedImageVO>>({
  key: "atom/ConvertedImage",
  default: {
    loading: false,
    fetched: false,
  }
});

export interface StoredImageVO {
  readonly id: string;
  readonly url: string;
  readonly personId?: number;
  readonly created?: number;
}

export const StoredImageResponseState = atom<ResponseState<StoredImageVO>>({
  key: "atom/StoredImage",
  default: {
    loading: false,
    fetched: false
  }
});

export enum ImageProgressStatus {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "success",
  DONE = "done",
  SEND = "send"
}

export interface ImageProgressVO {
  readonly _id: string;
  readonly status: ImageProgressStatus;
  readonly imageUrl: string;
  readonly worker?: string;
}

export const ImageProgressResponseState = atom<ResponseState<ImageProgressVO>>({
  key: "atom/ImageProgress",
  default: {
    loading: true,
    fetched: false
  }
});

/**
 * id: firestore 내의 ImageProgress 데이터를 폴링 하기 위한 아이디 (ImageProgress id)
 */
export interface PollingContextVO {
  id: string;
  personId: number;
}

export const PollingContextVOState = atom<PollingContextVO>({
  key: "atom/PollingContext",
  default: {
    id: "",
    personId: 0
  }
})
