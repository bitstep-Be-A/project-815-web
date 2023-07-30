import { BaseLayout } from "../components/layout";
import Centered from "../components/Centered";

const Error = (): JSX.Element => {
  return (
    <BaseLayout>
      <Centered>
        <span className="sm:text-3xl text-2xl">에러가 발생했습니다.</span>
      </Centered>
    </BaseLayout>
  );
}

export default Error;
