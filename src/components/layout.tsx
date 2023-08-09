import Header from "./Header";

import { useContext, useEffect } from "react";
import { RouterContext } from "../utils/router.util";
import { classNames } from "../utils";
import { screenWidthClassName } from "../styles/className";

import Button from "./Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';

interface BaseLayoutProps {
  children?: React.ReactNode;
  titleName?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  titleName
}) => {

  return (
    <main>
      <div className="background-img">
        <div className="background-wrapper"></div>
        <img className="w-full h-full" src={`${process.env.PUBLIC_URL}/images/doknipmun.jpeg`} alt="background img" />
      </div>
      <div className="w-full h-full flex flex-col items-center py-16">
        {
          titleName && (
            <Header titleName={titleName}/>
          )
        }
        {children}
      </div>
    </main>
  );
}

export const RouteLayout = ({children}: {children: React.ReactNode}) => {
  const router = useContext(RouterContext);

  useEffect(() => {
    router.setSlider(classNames(
      router.action === "BACK" ? "slide-out" : "",
      router.action === "PUSH" ? "slide-in" : "",
    ));
  }, [router]);
  
  return (
    <div className={classNames(
      "w-screen h-screen flex flex-col items-center"
    )}>
      <div className={classNames(
        screenWidthClassName, "h-full",
        "relative flex flex-col items-center overflow-hidden"
      )} style={{perspective: '0'}}>
        <div className={classNames(
          "fixed w-full h-[60px] drop-shadow-md bg-white",
          "flex flex-row items-center justify-center"
        )}>
          <Button className="absolute left-3" onClick={() => router.back()}>
            <ArrowBackIosIcon/>
          </Button>
          <Button className="absolute right-3" onClick={() => router.init()}>
            <CloseIcon/>
          </Button>
        </div>
        <div className={classNames(
          "w-full h-full",
          router.slider,
        )}>
          <h1 className="hidden">광복절 이벤트</h1>
          {children}
        </div>
      </div>
    </div>
  )
}
