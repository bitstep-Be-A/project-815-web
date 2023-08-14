import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useProcessImage } from "../controllers/upload.controller";
import { classNames } from "../utils";

import Button from "../components/Button";
import CachedIcon from '@mui/icons-material/Cached';

export default function Loading() {
  const navigate = useNavigate();

  const { dataState } = useProcessImage();

  const isComplete = useMemo(() => {
    return !dataState.loading && !dataState.error;
  }, [dataState]);

  const isFailure = useMemo(() => {
    return dataState.error;
  }, [dataState]);

  useEffect(() => {
    if (isComplete) {
      const imageId = dataState.data?.id;
      navigate(`/result/${imageId}`);
    }
  }, [isComplete, dataState]);

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
            <>
            <p className="font-pretendard underline text-gb-red text-sm">이미지 변환에 실패하였습니다</p>
            <Button
              className={classNames(
                "flex flex-row space-x-2 items-center rounded-md px-4 py-1"
              )}
              theme={"gb-purple"}
              onClick={() => {
                navigate(0);
              }}
            >
              <span>다시 시도하기</span>
              <CachedIcon></CachedIcon>
            </Button>
            </>
          )
        }
      </div>
    </>
  );
}
