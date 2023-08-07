import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useConvertedImage, useStoredImage } from "../controllers/upload.controller";
import { classNames } from "../utils";

import Button from "../components/Button";
import CachedIcon from '@mui/icons-material/Cached';

export default function Loading() {
  const navigate = useNavigate();

  const { dataState: convertedImageDataState } = useConvertedImage();
  const { dataState: storedImageDataState, add: storeImage } = useStoredImage();

  const [isButtonActive, setIsButtonActive] = useState(false);

  const isComplete = useMemo(() => {
    return (
      !convertedImageDataState.loading && !convertedImageDataState.error
    ) && (
      !storedImageDataState.loading && !storedImageDataState.error
    );
  }, [convertedImageDataState, storedImageDataState]);

  const isFailure = useMemo(() => {
    return (
      convertedImageDataState.error || storedImageDataState.error
    );
  }, [convertedImageDataState, storedImageDataState]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsButtonActive(true);
    }, 7000); // 30초

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!convertedImageDataState.loading) {
      convertedImageDataState.data &&
        storeImage({
          base64Image: convertedImageDataState.data.base64Images[0]
        });
    }
  }, [convertedImageDataState, storeImage]);

  useEffect(() => {
    if (isComplete) {
      const imageId = storedImageDataState.data?.id;
      navigate(`/${imageId}`);
    }
  }, [isComplete, storedImageDataState]);

  return (
    <>
      <div className="loading z-0"></div>
      <div className="w-full h-full flex flex-col items-center justify-center pb-28">
        <p>이미지 변환중입니다</p>
        <p>경우에 따라 약 3~5분 정도 소요될 수 있습니다</p>
      </div>
      <div className="absolute w-full h-full top-16 flex flex-col justify-center items-center z-50">
        {
          isFailure && (
            <p className="font-pretendard underline text-gb-red text-sm">이미지 변환에 실패하였습니다</p>
          )
        }
        <Button
          className={classNames(
            !isButtonActive ? "opacity-50" : "",
            "flex flex-row space-x-2 items-center rounded-md px-4 py-1"
          )}
          theme={"gb-purple"}
          onClick={() => {
            navigate(0);
          }}
          disabled={!isButtonActive}
        >
          <span>다시 시도하기</span>
          <CachedIcon></CachedIcon>
        </Button>
      </div>
    </>
  );
}
