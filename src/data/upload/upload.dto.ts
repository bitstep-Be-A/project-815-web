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

/**
 * base_image - image url
 * roop_image - image url
 * face_index - 0 or 1
 */
export interface RoopImg2imgDto {
  base_image: string;
  roop_image: string;
  face_index: number;
}
