import { classNames } from "../utils";

export const screenWidthClassName = "min-w-[360px] w-full";
export const descriptionClassName = "font-pretendard text-xs md:text-sm xl:text-base";
export const buttonClassName = "py-1 px-4 text-base sm:text-lg rounded-md";
export const subTitleClassName = "xl:text-4xl sm:text-3xl text-2xl";

export const addNavigateAnimation = (router: any) => {
  return classNames(
    router.action === "BACK" ? "slide-out" : "",
    router.action === "PUSH" ? "slide-in" : "",
  )
}
