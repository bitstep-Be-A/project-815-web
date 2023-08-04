import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { deepGray } from "../styles";
import { getPublicUrl, classNames } from "../utils";
import { axiosInstance } from "../api/axios";
import { storage } from "../api/firebase";
import { base64ToBlob, blobToBase64, sourceToBase64 } from "../utils/files.util";

import { BaseLayout } from "../components/layout";
import Button from "../components/Button";

const ROOP_MODEL_PATH = "/home/ubuntu/stable-diffusion-webui/models/roop/inswapper_128.onnx";

type GenderType = 'M' | 'F';

interface FileData {
  file?: File;
  gender: GenderType;
  personId?: number;
}

interface RoopImageSourceContext {
  source: string;
  config: {
    faceIndex?: number;
  }
}

const getRoopContext = (fileData: FileData, opt?: {faceIndex?: number}): RoopImageSourceContext => {
  let faceIndex;
  if (opt?.faceIndex) {
    faceIndex = opt?.faceIndex;
  } else {
    faceIndex = Math.floor(Math.random() * 2);
  }

  if (fileData.personId) {
    return {
      source: getPublicUrl(`/stable-diffusion/${fileData.gender}${fileData.personId}-${faceIndex}.png`),
      config: {
        faceIndex
      }
    }
  }

  return {
    source: getPublicUrl(`/stable-diffusion/${fileData.gender}G-${faceIndex}.png`),
    config: {}
  }
}

const Upload = (): JSX.Element => {
  const navigate = useNavigate();

  const [sessionNum, setSessionNum] = useState<number>(1);

  const [fileValue, setFileValue] = useState<File>();
  const [genderValue, setGenderValue] = useState<GenderType>('M');

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const storageRef = useMemo(() => {
    if (!fileValue) {
      return ref(storage);
    }
    return ref(storage, `upload/${Date.now()}${fileValue.name}`);
  }, [fileValue]);

  const [encodedImage, setEncodedImage] = useState<string | null>(null);

  const fileData: FileData = useMemo(() => {
    const personIdValue = sessionStorage.getItem('personId');
    const personId = personIdValue ? Number(personIdValue) : undefined;
    return {
      file: fileValue,
      gender: genderValue,
      personId
    }
  }, [fileValue, genderValue])

  useEffect(() => {
    if (error) {
      alert('파일 업로드에 실패하였습니다.');
      window.location.reload();
    }
  }, [error])

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

  const uploadFile = useCallback(async (convertedEncodedImage: string) => {
    const metadata = {
      contentType: 'image/jpeg',
    }

    const blob = base64ToBlob(convertedEncodedImage);

    const task = uploadBytesResumable(storageRef, blob, metadata);
    task.on("state_changed",
      (snapshot) => {
        setProgress(
          Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        );
      },
      (error) => {
        const msg = 'Error during image upload: ' + error;
        console.error(msg);
        setError(msg);
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((url) => {
          sessionStorage.setItem('converted', url);
          setLoading(false);
          navigate('/result');
        });
      });
  }, [fileValue, storageRef]);

  const convertImage = useCallback(async () => {
    if (!encodedImage) { return }
  
    try {
      const roopContext = getRoopContext(fileData);
      const initImage = await sourceToBase64(roopContext.source);
      const requestData = {
        "init_images": [initImage],
        "denoising_strength": 0.0,
        "image_cfg_scale": 0,
        "alwayson_scripts": {
          "roop": {
            "args": [
              encodedImage, // imgBase64
              true,  // enable
              String(roopContext.config.faceIndex),  // face_index
              ROOP_MODEL_PATH,  // model
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
      const response = await axiosInstance.post('/sdapi/v1/img2img', requestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = response.data;
      uploadFile(data.images[0]);
    } catch (error) {
      const msg = 'Error occurred: ' + error;
      console.error(msg);
      setError(msg);
    }
  }, [encodedImage, fileData]);

  const handleSubmit = useCallback(async () => {
    if (!fileValue) {
      const msg = 'Please select a file first'
      console.error(msg);
      setError(msg)
      return;
    }
    setLoading(true);
    blobToBase64(fileValue)
      .then((base64) => {
        setEncodedImage(base64);
      });
  }, [fileValue]);

  useEffect(() => {
    convertImage();
  }, [encodedImage, convertImage]);

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
          <button className={classNames(
            "w-48 py-3 bg-primary text-white text-xl rounded-lg",
            loading ? "opacity-70" : ""
            )} onClick={() => handleSubmit()} disabled={loading}>
            {
              !loading ? "선택 완료" : "변환중입니다"
            }
          </button>
        </section>
      </div>
    </BaseLayout>
  );
}

export default Upload;
