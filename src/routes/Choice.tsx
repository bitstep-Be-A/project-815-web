import { useContext } from "react";

import { RouterContext } from "../utils/router.util";

export default function Choice() {
  const router = useContext(RouterContext);

  return (
    <div className="w-full h-full bg-gray-300"></div>
  );
}
