import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useStoredImage } from "../controllers/upload.controller";
import { classNames, getPublicUrl } from "../utils";
import {
  contentContainerClassName
} from "../styles/className";
import { usePeople } from "../controllers/people.controller";

import { KakaoShareButton, LinkCopy } from "../components/share";
import { SubTitle } from "../components/Title";

const Share = ({ imageUrl }: { imageUrl: string }) => {
  const currentUrl = window.location.href;

  return (
    <div className="mt-12 flex flex-col space-y-2 items-center">
      <span className="sm:text-lg text-sm">내 결과 공유하기</span>
      <div className="w-fit mt-6 flex flex-row space-x-3">
        <KakaoShareButton currentUrl={currentUrl} imageUrl={imageUrl}/>
        <LinkCopy currentUrl={currentUrl} imageUrl={imageUrl}/>
      </div>
    </div>
  )
}

const Description = ({ personId }: { personId?: number }) => {
  const { items } = usePeople();
  const person = useMemo(() => items.find((v) => v.id === personId), [items]);

  return (
    <div className="w-full h-full flex flex-col items-center mt-10 bg-stone-50 px-3 py-3 mb-10">
      <h3 className="text-xl sm:text-2xl mb-8">나와 함께 사진을 찍은 인물은</h3>
      <img src={getPublicUrl(person?.imageUrl ?? "")} alt="person" />
      <div className="mt-8 sm:text-base text-sm">
        {person?.story}
      </div>
    </div>
  )
}

export default function Result() {
  const { imageId } = useParams();

  const { dataState } = useStoredImage(imageId);

  return (
    <div className={classNames(
      contentContainerClassName,
    )}>
      <SubTitle>
        {"촬영이 완료되었어요!"}
      </SubTitle>
      <div className="flex flex-col items-center justify-center">
        {
          (!dataState.loading && dataState.data) ? (
            <div className="w-[350px] sm:px-0 px-10">
              <div className="w-full bg-white">
                <img src={dataState.data.url} alt={String(dataState.data.created)} className="w-full h-full" />
              </div>
              <Share imageUrl={dataState.data.url}/>
              <Description personId={dataState.data.personId}/>
            </div>
          ) : (
            "loading..."
          )
        }
      </div>
    </div>
  );
}
