import { useCallback, useEffect, useState, useContext } from "react";
import { useRecoilState } from "recoil";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { DataController } from "./types";
import {
  ReservedImageVO,
  ReservedImageResponseState,
  StoredImageVO,
  StoredImageResponseState,
  ImageProgressVO,
  ImageProgressStatus,
  PollingContextVOState,
} from "../data/upload/upload.vo";
import {
  ConvertedImageDto,
  ImageFileDto,
} from "../data/upload/upload.dto";
import { RouterContext } from "../utils/router.util";
import { firebaseDB, storage } from "../api/firebase";
import fetchPostImg2img from "../api/fetchPostImg2img";

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

export const useProcessImage = (): DataController<ImageFileDto, StoredImageVO> => {
  const [responseState, setResponseState] = useRecoilState(StoredImageResponseState);

  const { items: reservedImages } = useReservedImages();

  const [pollingContext, setPollingContext] = useRecoilState(PollingContextVOState);

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
  
  /**
   * polling image progress
   */
  useEffect(() => {
    if (!pollingContext.id) return;

    const docRef = doc(firebaseDB, "imageProgress", pollingContext.id);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data() as (ImageProgressVO | undefined);
      if (data) {
        if (data.status === ImageProgressStatus.ERROR) {
          setResponseState({
            loading: false,
            fetched: false,
            error: ImageProgressStatus.ERROR
          });
        }
        if (data.status === ImageProgressStatus.SUCCESS) {
          const storedImage: StoredImageVO = {
            id: pollingContext.id,
            url: data.imageUrl,
            personId: pollingContext.personId,
            created: Date.now()
          }

          setDoc(doc(firebaseDB, "images", pollingContext.id), storedImage)
            .then(() => {
              setResponseState({
                data: storedImage,
                loading: false,
                fetched: false,
              });
            })
            .catch((e) => setResponseState({
              data: undefined,
              loading: false,
              fetched: false,
              error: e
            }));
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pollingContext]);

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

    const reservedImageRef = ref(storage, reservedImage.imageUrl);
    const baseImageUrl = await getDownloadURL(reservedImageRef);

    const myImageRef = ref(storage, `my/${Date.now()}${data.file.name}`);
    const myImageSnapshot = await uploadBytes(myImageRef, data.file, {contentType: 'image/jpeg'});
    const roopImageUrl = await getDownloadURL(myImageSnapshot.ref);

    fetchPostImg2img({
      base_image: baseImageUrl,
      roop_image: roopImageUrl,
      face_index: reservedImage.myPosition
    }).then((context) => {
      setPollingContext({
        personId: data.personId,
        id: context.id
      });
    }).catch((error) => {
      setResponseState({
        loading: false,
        error: error,
        fetched: false
      });
    });
  }, [responseState, reservedImages, pollingContext]);

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
  }, []);

  async function add() {};
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
