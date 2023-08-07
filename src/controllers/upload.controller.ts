import { useCallback, useEffect, useState, useContext } from "react";
import { useRecoilState } from "recoil";

import { DataController } from "./types";
import { ConvertedImageVO, ConvertedImageResponseState, ReservedImageVO, ReservedImageResponseState } from "../data/upload/upload.vo";
import {
  ImageFileDto,
} from "../data/upload/upload.dto";
import { blobToBase64, sourceToBase64 } from "../utils/files.util";
import { axiosInstance } from "../api/axios";
import { RouterContext } from "../utils/router.util";

export const useReservedImages = (): DataController<undefined, ReservedImageVO> => {
  const [items, setItems] = useState<ReservedImageVO[]>([]);
  const [responseState, setResponseState] = useRecoilState(ReservedImageResponseState);

  const router = useContext(RouterContext);

  useEffect(() => {
    if (router.current === 'upload') {
      fetch('reservedImage.json')
        .then((res) => res.json())
        .then((data: ReservedImageVO[]) => {
          setItems(data);
          setResponseState({
            ...responseState,
            loading: false,
            fetched: false
          });
        });
    } else {
      setResponseState({
        ...responseState,
        loading: true,
        fetched: true
      })
    }
  }, [responseState, router]);

  async function add() {};
  async function modify() {};
  async function remove() {};

  return {
    items,
    dataState: responseState,
    add,
    modify,
    remove
  }
}

export const useConvertedImage = (): DataController<ImageFileDto, ConvertedImageVO> => {
  const [responseState, setResponseState] = useRecoilState(ConvertedImageResponseState);

  const { items: reservedImages } = useReservedImages();

  useEffect(() => {
    if (responseState.fetched) {
      setResponseState({
        data: undefined,
        loading: false,
        fetched: false,
      });
    }
  }, [responseState]);
  
  const add = useCallback(async (data: ImageFileDto) => {
    if (!data.file) { throw new Error("File이 업로드되지 않았습니다.") }

    setResponseState({
      ...responseState,
      loading: true
    });
    
    const reservedImageData = reservedImages.find(v => v.personId === data.personId)!;

    const initImage = sourceToBase64(reservedImageData.imageUrl ?? "");
    const base64Image = blobToBase64(data.file);
    const requestBody = {
      "init_images": [initImage],
      "denoising_strength": 0.0,
      "image_cfg_scale": 0,
      "alwayson_scripts": {
        "roop": {
          "args": [
            base64Image, // imgBase64
            true,  // enable
            String(reservedImageData.myPosition),  // face_index
            "/home/ubuntu/stable-diffusion-webui/models/roop/inswapper_128.onnx",  // model
            "CodeFormer",  // face_restorer_name
            1,  // face_restorer_visibility
            null,  // upscaler_name
            1,  // upscaler_scale
            1,  // upscaler_visibility
            false,  // swap_in_source
            true  // swap_in_generated
          ]
        }
      }
    }
    
    axiosInstance.post('/sdapi/v1/img2img', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.data)
      .then((data) => {
      setResponseState({
        ...responseState,
        data: data,
        fetched: true
      });
    });
  }, [responseState, reservedImages]);

  async function modify() {};
  async function remove() {};

  return {
    dataState: responseState,
    items: [],
    add,
    modify,
    remove
  }
}
