import { axiosInstance } from "./axios";

import { ConvertedImageVO } from "../data/upload/upload.vo";
import { RoopImg2imgDto } from "../data/upload/upload.dto";

export default async (data: RoopImg2imgDto): Promise<ConvertedImageVO> => {
  return axiosInstance.post("/api/v1/img2img", data)
    .then(res => res.data)
}
