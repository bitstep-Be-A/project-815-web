import { useParams } from "react-router-dom";

import { useStoredImage } from "../controllers/upload.controller";
import { classNames } from "../utils";
import {
  subTitleClassName,
  contentContainerClassName
} from "../styles/className";

export default function Result() {
  const { imageId } = useParams();

  const { dataState } = useStoredImage(imageId);

  return (
    <div className={contentContainerClassName}>
      <div className="w-full flex justify-center">
        <h2 className={classNames(
          subTitleClassName,
          "my-4"
        )}>
          촬영이 완료되었어요!
        </h2>
      </div>
      <div className="w-full h-full flex lg:flex-row flex-col items-center justify-center">
        {
          !dataState.loading ? (
            <img src={dataState.data?.url} alt={String(dataState.data?.created)} />
          ) : (
            "loading..."
          )
        }
      </div>
    </div>
  );
}
