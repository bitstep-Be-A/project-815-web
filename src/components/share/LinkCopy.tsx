import { getPublicUrl } from "../../utils";

export const LinkCopy = ({ currentUrl, imageUrl }: {
  currentUrl: string;
  imageUrl: string;
}) => {
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      onClick={() => {handleCopyClipBoard(currentUrl)}}
    >
      <img src={getPublicUrl("icons/link-share-logo.png")} alt="link-share" className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]" />
    </button>
  )
}