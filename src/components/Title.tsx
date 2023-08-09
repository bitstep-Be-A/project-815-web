import { classNames } from "../utils"
import { subTitleClassName } from "../styles/className"

export const SubTitle = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="w-full flex justify-center">
      <h2 className={classNames(
        subTitleClassName,
        "my-4"
      )}>
        {children}
      </h2>
    </div>
  )
}
