import { getPublicUrl } from "../../utils";

const { Kakao } = window as any;

export function KakaoShareButton({ currentUrl, imageUrl }: {
  currentUrl: string;
  imageUrl: string;
}) {
  const shareKakao = (url: string, title: string, description: string) => {
    if (Kakao) {
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_APP_KEY);
      }
    }

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl:
          imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url
        },
      },
      buttons: [
        {
          title: '이벤트 참여하기',
          link: {
            mobileWebUrl: process.env.REACT_APP_DOMAIN_URL,
            webUrl: process.env.REACT_APP_DOMAIN_URL
          },
        },
        {
          title: '결과 확인하기',
          link: {
            mobileWebUrl: url,
            webUrl: url
          },
        },
      ],
    });
  }

  return (
    <button
      onClick={() => {
        shareKakao(
          currentUrl,
          "독립운동가와 함께 찍는 AI 인생샷!",
          "AI가 생성해주는 독립운동가의 모습과 함께 잊지 못할 추억을 남기세요~!"
        )
      }}
    >
      <img src={getPublicUrl("icons/kakao-share-logo.png")} alt="kakao" className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]" />
    </button>
  )
}
