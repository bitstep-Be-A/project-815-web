import { useCallback, useEffect, useState, useContext } from "react";
import { useRecoilState } from "recoil";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { DataController } from "./types";
import { ConvertedImageVO, ConvertedImageResponseState, ReservedImageVO, ReservedImageResponseState, StoredImageVO, StoredImageResponseState } from "../data/upload/upload.vo";
import {
  ConvertedImageDto,
  ImageFileDto,
} from "../data/upload/upload.dto";
import { base64ToBlob, blobToBase64, sourceToBase64 } from "../utils/files.util";
import { axiosInstance } from "../api/axios";
import { RouterContext } from "../utils/router.util";
import { firebaseDB, storage } from "../api/firebase";

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
            loading: false,
            fetched: false
          });
        });
    }
  }, [router]);

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

  const init = useCallback(() => {
    setResponseState({
      data: undefined,
      loading: false,
      fetched: false,
      error: undefined
    });
  }, [setResponseState]);

  useEffect(() => {
    if (responseState.fetched) {
      init();
    }
  }, [responseState, init]);
  
  const add = useCallback(async (data: ImageFileDto) => {
    if (!data.file) { throw new Error("File이 업로드되지 않았습니다.") }

    setResponseState({
      ...responseState,
      loading: true
    });
    
    const tmp = reservedImages.filter(v => (v.personId === data.personId) && (v.gender === data.gender));
    if (tmp.length === 0) {
      throw new Error("reservedImage가 존재하지 않습니다.");
    }
    const reservedImage = tmp[Math.floor(Math.random() * tmp.length)];

    const storageRef = ref(storage, reservedImage.imageUrl);
    const sourceUrl = await getDownloadURL(storageRef);

    const initImage = await sourceToBase64(sourceUrl);
    const base64Image = await blobToBase64(data.file);

    const requestBody = {
      "init_images": [initImage],
      "denoising_strength": 0.0,
      "image_cfg_scale": 0,
      "alwayson_scripts": {
        "roop": {
          "args": [
            base64Image, // imgBase64
            true,  // enable
            String(reservedImage.myPosition),  // face_index
            process.env.REACT_APP_MODEL_ROOT,  // model
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
      })
      .catch((error) => {
        setResponseState({
          ...responseState,
          error
        });
      });
  }, [responseState, reservedImages]);

  async function modify() {};
  async function remove() {};

  return {
    dataState: responseState,
    items: [],
    init,
    add,
    modify,
    remove
  }
}

export const useStoredImage = (id?: string): DataController<ConvertedImageDto, StoredImageVO> => {
  const [responseState, setResponseState] = useRecoilState(StoredImageResponseState);

  const [imageUrl, setImageUrl] = useState<string>("");

  const init = useCallback(() => {
    if (!id) {
      return;
    }
    const docRef = doc(firebaseDB, "images", id);
    getDoc(docRef)
      .then((snap) => {
        if (!snap.exists()) {
          setResponseState({
            error: "Image not found",
            data: undefined,
            fetched: false,
            loading: false
          });
        }
        setResponseState({
          data: snap.data() as StoredImageVO,
          fetched: false,
          loading: false
        });
      })
      .catch(error => setResponseState({
        error,
        data: undefined,
        fetched: false,
        loading: false
      }));
  }, [setResponseState]);

  useEffect(() => {
    if (id) {
      init();
    }
  }, [responseState]);

  useEffect(() => {
    if (!!imageUrl) {
      addDoc(collection(firebaseDB, "images"), {
        url: imageUrl,
        created: serverTimestamp()
      })
        .then((docRef) => {
          setResponseState({
            data: {
              id: docRef.id,
              url: imageUrl,
            },
            fetched: false,
            loading: false
          })
        });
    }
  }, [imageUrl]);

  const uploadFile = useCallback(async (base64Image: string) => {
    const storageRef = ref(storage, `upload/${Date.now()}${base64Image.slice(1, 10)}.png`);

    const metadata = {
      contentType: 'image/jpeg',
    }

    const blob = base64ToBlob(base64Image);
    const task = uploadBytesResumable(storageRef, blob, metadata);
    task.on("state_changed",
      (snapshot) => {},
      (error) => {
        setResponseState({
          error,
          data: undefined,
          fetched: false,
          loading: false
        });
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
  }, []);

  const add = useCallback(async (data: ConvertedImageDto) => {
    setResponseState({
      ...responseState,
      loading: true,
      fetched: false
    });
    uploadFile(data.base64Image);
  }, [imageUrl]);

  async function modify() {};
  async function remove() {};

  return {
    items: [],
    dataState: responseState,
    add,
    modify,
    remove
  }
}
