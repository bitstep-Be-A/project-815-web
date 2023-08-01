import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deepGray } from "../styles";
import { getPublicUrl, classNames } from "../utils";
import { axiosInstance } from "../api/axios";

import { BaseLayout } from "../components/layout";
import Button from "../components/Button";

type GenderType = 'M' | 'F'

const Upload = (): JSX.Element => {
  const navigate = useNavigate();

  const [sessionNum, setSessionNum] = useState<number>(1);

  const [fileValue, setFileValue] = useState<File>();
  const [genderValue, setGenderValue] = useState<GenderType>('M');

  const hiddenFileInputElement = useRef<HTMLInputElement>(null);

  const handleFileDrop = useCallback((e?: React.DragEvent) => {
    e?.preventDefault();
    const files = e?.dataTransfer.files;
    if (files) {
      setFileValue(files[0]);
      setSessionNum(2);
    } else { throw new Error('파일 업로드에 실패하였습니다.') }
  }, [setFileValue, setSessionNum]);

  const handleClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    hiddenFileInputElement.current?.click();
  };

  const handleFileChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target.files;
    if (files) {
      setFileValue(files[0]);
      setSessionNum(2);
    }
  }, [setFileValue, setSessionNum]);

  const handleGenderChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target.value;
    value && setGenderValue(value as GenderType);
  };

  const handleSubmit = async () => {
    try {
      // const response = await axiosInstance.post('/upload', {file: fileValue, gender: genderValue}, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   }
      // });
      // console.log(response.data);
      navigate('/result');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  return (
    <BaseLayout
      titleName="사진 업로드(파일 선택, 파일 드래그)"
    >
      <div className="w-full h-full">
        <section className={classNames(
          sessionNum !== 1 ? 'hidden' : '',
          "w-full h-full flex flex-col justify-center items-center"
        )}>
          <Button
            className="w-[350px] h-[350px] border-2 border-black border-dashed rounded-3xl flex flex-col justify-center items-center bg-shallow-gray hover:bg-black hover:opacity-40"
            onDragEnter={(e) => e?.preventDefault()}
            onDragOver={(e) => e?.preventDefault()}
            onDrop={(e) => handleFileDrop(e)}
            onClick={handleClick}
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
          "w-full h-full flex flex-col justify-center items-center"
        )}>
          <div className="w-56 flex flex-row justify-between mb-12 text-xl">
            <label>
              <input type="radio" name="sex" value="M" checked={genderValue === 'M'} onChange={handleGenderChange} /> 남
            </label>
            <label>
              <input type="radio" name="sex" value="F" checked={genderValue === 'F'} onChange={handleGenderChange} /> 여
            </label>
          </div>
          <button className="w-48 py-3 bg-primary text-white text-xl rounded-lg" onClick={() => handleSubmit()}>
            선택 완료
          </button>
        </section>
      </div>
    </BaseLayout>
  );
}

export default Upload;
