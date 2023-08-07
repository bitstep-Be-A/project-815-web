import { useContext, useMemo } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RouterContext, useRouter } from "../utils/router.util";
import { screenWidthClassName, addNavigateAnimation } from "../styles/className";
import { classNames } from "../utils";
import Button from "../components/Button";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Choice from "./Choice";
import People from "./People";
import Upload from "./Upload";
import Result from "./Result";
import Landing from "./Landing";
import Loading from "./Loading";

const Layout = ({children}: {children: React.ReactNode}) => {
  const router = useContext(RouterContext);
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
          addNavigateAnimation(router),
        )}>
          <h1 className="hidden">광복절 이벤트</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

const RouteElement = () => {
  const router = useContext(RouterContext);

  const element = useMemo(() => {
    switch(router.current) {
      case null:
        return (
          <Landing/>
        );
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
        )
      case 'upload':
        return (
          <Layout>
            <Upload/>
          </Layout>
        );
      case 'loading':
        return (
          <Layout>
            <Loading/>
          </Layout>
        );
      default:
        return (
          <></>
        );
    }
  }, [router]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={element}/>
        <Route path={"/:imageId"} element={
          <Layout>
            <Result/>
          </Layout>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default function SinglePathRoute() {
  const router = useRouter();

  return (
    <RouterContext.Provider value={router}>
      <RouteElement/>
    </RouterContext.Provider>
  );
}
