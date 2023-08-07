import { useContext, useState, useRef, useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

import { RouterContext } from "../utils/router.util";
import { ImageFileDtoState } from "../data/upload/upload.dto";
import { useConvertedImage } from "../controllers/upload.controller";
import {
  descriptionClassName,
  subTitleClassName,
  contentContainerClassName
} from "../styles/className";
import { classNames, getPublicUrl } from "../utils";
import { deepGray } from "../styles";
import { GenderType } from "../data/types";

import Button from "../components/Button";

export default function Upload() {
  const router = useContext(RouterContext);
  const [sessionNum, setSessionNum] = useState<number>(1);

  const [imageFileDto, setImageFileDto] = useRecoilState(ImageFileDtoState);

  const controller = useConvertedImage();

  const hiddenFileInputElement = useRef<HTMLInputElement>(null);

  const handleFileDrop = useCallback((e?: React.DragEvent) => {
    e?.preventDefault();
    const files = e?.dataTransfer.files;
    if (files) {
      setImageFileDto({
        ...imageFileDto,
        file: files[0]
      });
      setSessionNum(2);
    } else { throw new Error('파일 업로드에 실패하였습니다.') }
  }, [imageFileDto]);

  const handleFileUploaderClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    hiddenFileInputElement.current?.click();
  }

  const handleFileChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target.files;
    if (files) {
      setImageFileDto({
        ...imageFileDto,
        file: files[0]
      });
      setSessionNum(2);
    } else { throw new Error('파일 업로드에 실패하였습니다.') }
  }, [imageFileDto]);

  const handleGenderChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    value && setImageFileDto({
      ...imageFileDto,
      gender: value as GenderType
    })
  }, [imageFileDto]);

  const handleSubmit = useCallback(async () => {
    if (!imageFileDto.file) {
      const msg = 'Please select a file first';
      console.error(msg);
      return;
    }
    controller.add(imageFileDto);
  }, [controller, imageFileDto]);

  useEffect(() => {
    if (controller.dataState.loading) {
      router.push("loading");
    }
  }, [controller, router]);

  return (
    <div className={contentContainerClassName}>
      {
        sessionNum === 1 && (
          <div className="w-full flex justify-center">
            <h2 className={classNames(
              subTitleClassName,
              "my-4"
            )}>
              업로드할 이미지를 선택해주세요
            </h2>
          </div>
        )
      }
      {
        sessionNum === 2 && (
          <div className="w-full flex flex-col items-center">
            <h2 className={classNames(
              subTitleClassName,
              "my-4"
            )}>
              성별을 선택해주세요
            </h2>
            <div className={classNames(
              descriptionClassName,
              "absolute top-32"
            )}>
              <p>(본인 사진과 동일한 성별이 아닐 경우 이미지가 왜곡될 수 있습니다)</p>
            </div>
          </div>
        )
      }
      <div className="w-full h-full">
        <section className={classNames(
          sessionNum !== 1 ? 'hidden' : '',
          "w-full h-full flex flex-col items-center mt-24"
        )}>
          <Button
            className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] border-2 border-black border-dashed rounded-3xl flex flex-col justify-center items-center bg-shallow-gray hover:bg-black hover:opacity-40"
            onDragEnter={(e) => e?.preventDefault()}
            onDragOver={(e) => e?.preventDefault()}
            onDrop={(e) => handleFileDrop(e)}
            onClick={handleFileUploaderClick}
          >
            <img src={getPublicUrl('images/drive_folder_upload.png')} alt="file upload"/>
            <div className="text-center text-lg" style={{color: deepGray}}>
              <p>파일 선택 또는 드래그</p>
              <p>해주세요</p>
            </div>
            <input type="file" className="hidden" accept=".jpg, .jpeg, .png" onChange={(e) => handleFileChange(e)} ref={hiddenFileInputElement} />
          </Button>
        </section>
        <section className={classNames(
          sessionNum !== 2 ? 'hidden' : '',
          "w-full h-full flex flex-col items-center mt-24 sm:mt-36"
        )}>
          <div className="sm:w-44 w-32 flex flex-row justify-between mb-6 sm:mb-12 md:text-xl sm:text-lg text-sm font-pretendard">
            <label>
              <input type="radio" name="gender" value="M" checked={imageFileDto.gender === "M"} onChange={(e) => handleGenderChange(e)} /> 남
            </label>
            <label>
              <input type="radio" name="gender" value="F" checked={imageFileDto.gender === "F"} onChange={(e) => handleGenderChange(e)} /> 여
            </label>
          </div>
          <Button className={classNames(
              "sm:w-48 w-36 py-2 sm:py-3 bg-gb-purple text-white text-md sm:text-xl rounded-lg font-pretendard",
              controller.dataState.loading ? "opacity-70" : "",
            )}
            onClick={() => handleSubmit()} disabled={controller.dataState.loading}
          >
            확인
          </Button>
        </section>
      </div>
    </div>
  );
}
