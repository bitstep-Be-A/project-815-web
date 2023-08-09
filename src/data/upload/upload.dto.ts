import { atom } from "recoil";

import { GenderType } from "../types";

export interface ImageFileDto {
  file?: File;
  gender: GenderType;
  personId: number;
}

export const InitImageFileDto: ImageFileDto = {
  file: undefined,
  gender: "M",
  personId: 0
}

export const ImageFileDtoState = atom<ImageFileDto>({
  key: "atom/ImageFile",
  default: InitImageFileDto
});

export interface ConvertedImageDto {
  base64Image: string;
  personId: number;
}
