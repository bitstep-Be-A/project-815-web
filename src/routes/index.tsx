import { useContext, useMemo } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RouterContext, useRouter } from "../utils/router.util";

import { RouteLayout } from "../components/layout";
import Choice from "./Choice";
import People from "./People";
import Upload from "./Upload";
import Result from "./Result";
import Landing from "./Landing";
import Loading from "./Loading";

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
          <RouteLayout>
            <Choice/>
          </RouteLayout>
        );
      case 'people':
        return (
          <RouteLayout>
            <People/>
          </RouteLayout>
        )
      case 'upload':
        return (
          <RouteLayout>
            <Upload/>
          </RouteLayout>
        );
      case 'loading':
        return (
          <RouteLayout>
            <Loading/>
          </RouteLayout>
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
          <Result/>
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
