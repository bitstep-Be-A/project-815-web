import { useContext } from "react";

import { classNames, getPublicUrl } from "../utils";
import {
  screenWidthClassName,
  descriptionClassName,
  buttonClassName
} from "../styles/className";
import { usePopupRouter, PopupContext } from "../utils/popup.util";

import Button from "../components/Button";
import Popup from "./popups";

const DonationBanner = () => {
  return (
    <div className={classNames(
      screenWidthClassName,
      "fixed sm:top-8 h-[60px] flex items-center justify-end drop-shadow-lg bg-white z-50"
    )}>
      <Button
        theme="gb-blue"
        className={classNames(
          "relative right-4 sm:right-6",
          buttonClassName
        )}
      >
        후원하기
      </Button>
    </div>
  );
}

const SubTitle = ({children, className}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={classNames(
      "xl:text-4xl sm:text-3xl text-2xl",
      className
    )}>{children}</h2>
  )
}

const Page = () => {
  const router = useContext(PopupContext);

  return (
    <div className={classNames(
      "flex flex-col items-center w-full",
      router.current !== null ? "behind" : ""
    )}>
      <DonationBanner/>
      <Button
        theme="gb-red"
        className={classNames(
          "text-base sm:text-lg xl:text-2xl py-1 px-4 rounded-md",
          "fixed bottom-8 z-50 drop-shadow-md"
        )}
        onClick={() => router.push("choice")}
      >
        지금 시작하기
      </Button>
      <div className={classNames(
        screenWidthClassName,
        "h-full relative drop-shadow-xl bg-zinc-50"
      )}>
        <section className="relative w-full min-h-[400px] h-[760px] sm:h-[900px]">
          <div className="behind absolute w-full h-[760px] sm:h-[900px]">
            <img src={getPublicUrl("/images/landing/baekdu.png")} alt="baekdu" className="w-full h-full" />
          </div>
          <div className="w-full h-full flex flex-col pt-[150px] items-center">
            <div className="flex jusitify-center items-center rounded-full bg-gb-blue text-white">
              <span className="px-4 xl:px-10 xl:text-base sm:text-sm text-xs">815 광복절 기념</span>
            </div>
            <h1 className="xl:text-7xl sm:text-5xl text-4xl text-gb-blue pt-2 sm:pt-4 mb-8 sm:mb-16">광복절 이벤트</h1>
            <div className={classNames(
              "w-[350px] sm:w-[430px] text-center",
              descriptionClassName
            )}>
              <p>독립유공자와 함께하는 815 광복절 사진 합성 이벤트!</p>
              <br/>
              <p>내 사진만 찍으면 독립유공자와 함께 인생 사진을 찍을 수 있다고?</p>
              <p>이번 815 광복절을 더욱 특별한 방법으로 함께하세요!</p>
              <br/>
              <p>참가자들이 본인의 사진을 등록하면 AI 사진 합성을 통해</p>
              <p>독립운동가분들과 함께한 듯한 사진을 제공해 드립니다.</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full mt-12" style={{
              backgroundColor: 'rgba(195, 215, 228, 0.15)',
            }}>
              <div className="rounded-md px-8 sm:px-10 py-1 sm:py-2 mb-8 sm:mb-10" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                <SubTitle>참여방법</SubTitle>
              </div>
              <img src={getPublicUrl("/images/landing/guide.png")} alt="guide" />
            </div>
          </div>
        </section>
        <section className="w-full h-fit pt-20 md:pt-24">
          <div className="w-full flex flex-col items-center mb-16 md:mb-20 space-y-8">
            <p className="text-gb-purple text-lg">인스타그램에 나의 사진을 공유하세요</p>
            <Button
              theme="gb-purple"
              className={buttonClassName}
              onClick={() => router.push("choice")}
            >
              공유하기
            </Button>
          </div>
          <div className="w-full">
            <img src={getPublicUrl("/images/landing/share.png")} alt="share" className="w-full" />
          </div>
          <div className={classNames(
            "flex flex-col md:space-y-3 px-2 sm:px-4 py-2 sm:py-4 bg-gb-purple text-white",
            descriptionClassName,
            "text-[10px]"
          )}>
            <p>독립운동가들과 사진을 합성해서 공유하세요!</p>
            <p>사진을 업로드하는 것은 서비스 약관 및 개인정보보호정책에 동의하는 것으로 간주합니다.</p>
          </div>
        </section>
        <section className="w-full py-24 bg-black">
          <div className="w-full text-center text-white mb-12">
            <SubTitle>파트너</SubTitle>
            <p className={classNames(
              "mt-8",
              descriptionClassName
            )}>이 프로젝트는 다음의 파트너들과 함께합니다</p>
          </div>
          <img src={getPublicUrl("/images/landing/donors.png")} alt="donors" />
        </section>
      </div>
    </div>
  )
}

export default function Landing() {
  const router = usePopupRouter();

  return (
    <PopupContext.Provider value={router}>
      {
        router.current === null ? <Page/> : <Popup/>
      }
    </PopupContext.Provider>
  )
}
