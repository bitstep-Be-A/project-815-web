import { getPublicUrl } from "../utils";

import { BaseLayout } from "../components/layout";

const Result = (): JSX.Element => {
  return (
    <BaseLayout
      titleName="촬영이 완료되었어요!"
    >
      <div className="w-full h-full flex lg:flex-row flex-col items-center justify-center">
        <img src={getPublicUrl("images/selfie_example_younbonggil.png")} alt="셀카" />
      </div>
    </BaseLayout>
  );
}

export default Result;
