import { BaseLayout } from "../components/layout"
import Centered from "../components/Centered";

const NotFound = (): JSX.Element => {
  return (
    <BaseLayout>
      <Centered>
        <span className="sm:text-3xl text-2xl">페이지를 찾을 수 없습니다.</span>
      </Centered>
    </BaseLayout>
  )
}

export default NotFound;
