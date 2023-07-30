import { classNames } from "../utils";

interface CenteredProps {
  className?: string;
  children?: React.ReactNode;
  direction?: 'column' | 'row'
}

const Centered: React.FC<CenteredProps> = ({
  className,
  children,
  direction
}) => {
  return (
    <div className={classNames(
      "flex justify-center items-center w-full h-full",
      direction === 'column' ? 'flex-col' : '',
      direction === 'row' ? 'flex-row' : '',
      className
    )}>
      {children}
    </div>
  )
}

export default Centered;
