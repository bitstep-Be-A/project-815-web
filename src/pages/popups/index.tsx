import { useContext } from "react";

import { PopupContext } from "../../utils/popup.util";
import { screenWidthClassName } from "../../styles/className";
import { classNames } from "../../utils";
import Button from "../../components/Button";
import { getPublicUrl } from "../../utils";

import Choice from "./Choice";
import People from "./People";
import Upload from "./Upload";
import Result from "./Result";

const Layout = ({children}: {children: React.ReactNode}) => {
  const router = useContext(PopupContext);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className={classNames(
        screenWidthClassName,
        "fixed h-[60px] drop-shadow-md bg-white",
        "flex flex-row items-center justify-center"
      )}>
        <Button className="absolute left-3" onClick={() => router.back()}>
          <img src={getPublicUrl("/icons/arrow_back_ios_new.png")} alt="back_icon" />
        </Button>
      </div>
      <div className={classNames(
        "h-full",
        screenWidthClassName
      )}>
        {children}
      </div>
    </div>
  )
}

export default function Popup() {
  const router = useContext(PopupContext);

  switch(router.current) {
    case null:
      return <></>;
    case 'choice':
      return (
        <Layout>
          <Choice/>
        </Layout>
      );
    case 'people':
      return (
        <Layout>
          <People/>
        </Layout>
      );
    case 'result':
      return (
        <Layout>
          <Result/>
        </Layout>
      );
    case 'upload':
      return (
        <Layout>
          <Upload/>
        </Layout>
      );
    default:
      return <></>;
  }
}
