import { useState, useEffect } from "react";

import { BaseLayout } from "../components/layout";

const Result = (): JSX.Element => {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    const imageUrl = sessionStorage.getItem('converted') ?? '';
    setUrl(imageUrl);
  }, []);

  return (
    <BaseLayout
      titleName="촬영이 완료되었어요!"
    >
      <div className="w-full h-full flex lg:flex-row flex-col items-center justify-center">
        <img src={url} alt="셀카" />
      </div>
    </BaseLayout>
  );
}

export default Result;
