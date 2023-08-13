import { axiosInstance } from "./axios";

import { PollingContextVO } from "../data/upload/upload.vo";
import { RoopImg2imgDto } from "../data/upload/upload.dto";

export default async (data: RoopImg2imgDto): Promise<PollingContextVO> => {
  return axiosInstance.post("/api/v1/img2img", data)
    .then(res => res.data)
}
