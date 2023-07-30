import { primaryColor } from "../styles";

import { getPublicUrl } from "../utils";

import { BaseLayout } from "../components/layout";
import Tab from "../components/Tab";
import Button from "../components/Button";

const Landing = (): JSX.Element => {
  return (
    <BaseLayout
      titleName="독립운동가와 함께 인생샷 남기기"
    >
      <div className="w-full h-full flex flex-col items-center">
        <div className="text-lg sm:text-xl md:text-3xl text-center mt-24 mb-12">
          <p>내 사진을 올리고,</p>
          <p>독립운동가분들과 찍은 셀카를 공유하세요</p>
        </div>
        <div className="sm:w-[400px] w-4/5">
          <img src={getPublicUrl('/images/selfie_flow.png')} alt="selfie_flow"/>
        </div>
        <div className="text-lg sm:text-xl md:text-3xl text-center mt-16 mb-12">
          <p>독립운동가 분들과 즐거운 추억을 남겨보아요~!</p>
        </div>
        <div className="w-full flex flex-row justify-center">
          <img src={getPublicUrl('/images/selfie_example_kimgoo.png')} alt="김구" className="w-[150px] h-[240px] md:w-[200px] md:h-[300px] hidden xl:block"/>
          <img src={getPublicUrl('/images/selfie_example_yugwansoon.png')} alt="유관순" className="w-[150px] h-[240px] md:w-[200px] md:h-[300px] xl:ml-8"/>
          <img src={getPublicUrl('/images/selfie_example_anjunggeun.png')} alt="안중근" className="w-[150px] h-[240px] md:w-[200px] md:h-[300px] ml-8"/>
          <img src={getPublicUrl('/images/selfie_example_anchangho.png')} alt="안창호" className="w-[150px] h-[240px] md:w-[200px] md:h-[300px] ml-8 hidden xl:block"/>
        </div>
        <Tab
          className="w-full flex md:hidden flex-col mt-16 pb-8"
          nav={{
            names: ['셀카찍기', '단체사진찍기'],
            className: "w-full flex flex-row justify-center space-x-8 mb-4",
            activeStyle: {
              textDecoration: 'underline',
              color: primaryColor,
            },
            inactiveStyle: {}
          }}
          contents={[
            <div className="flex flex-col items-center">
              <img src={getPublicUrl('/images/selfie_example_younbonggil.png')} alt="셀카"/>
              <Button
                type="link"
                theme="primary"
                to='/people'
                className="w-[176px] py-4 mt-20 rounded-xl text-xl text-center"
              >
                셀카찍기
              </Button>
            </div>,
            <div className="flex flex-col items-center">
              <img src={getPublicUrl('/images/group.png')} alt="단체사진"/>
              <Button
                type="link"
                theme="primary"
                to='/upload'
                className="w-[176px] py-4 mt-20 rounded-xl text-xl text-center"
              >
                단체사진찍기
              </Button>
            </div>
          ]}
        ></Tab>
        <div className="w-full hidden md:flex flex-col mt-16 pb-8">
          <div className="w-full flex flex-row justify-center md:space-x-10">
            <div className="flex flex-col items-center">
              <img src={getPublicUrl('/images/selfie_example_younbonggil.png')} alt="셀카"/>
              <Button
                type="link"
                theme="primary"
                to='/people'
                className="w-[176px] py-4 mt-20 rounded-xl text-xl text-center"
              >
                셀카찍기
              </Button>
            </div>
            <div className="md:flex hidden flex-col items-center">
              <img src={getPublicUrl('/images/group.png')} alt="단체사진"/>
              <Button
                type="link"
                theme="primary"
                to='/upload'
                className="w-[176px] py-4 mt-20 rounded-xl text-xl text-center"
              >
                단체사진찍기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Landing;
