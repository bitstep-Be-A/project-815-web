import { useContext, useState, useEffect } from "react";

import { RouterContext } from "../utils/router.util";
import { useConvertedImage } from "../controllers/upload.controller";
import { classNames } from "../utils";
import {
  subTitleClassName,
  contentContainerClassName
} from "../styles/className";

export default function Result() {
  const router = useContext(RouterContext);

  const { dataState } = useConvertedImage();
  useEffect(() => {

  }, []);

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
        <img src={dataState.data?.base64Images[0]} alt="" />
      </div>
    </div>
  );
}
