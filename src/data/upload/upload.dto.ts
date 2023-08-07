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
