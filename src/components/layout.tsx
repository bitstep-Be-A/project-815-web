import Header from "./Header";

interface BaseLayoutProps {
  children?: React.ReactNode;
  titleName?: string;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  titleName
}) => {

  return (
    <main>
      <div className="background-img">
        <div className="background-wrapper"></div>
        <img className="w-full h-full" src={`${process.env.PUBLIC_URL}/images/doknipmun.jpeg`} alt="background img" />
      </div>
      <div className="w-full h-full flex flex-col items-center py-16">
        {
          titleName && (
            <Header titleName={titleName}/>
          )
        }
        {children}
      </div>
    </main>
  );
}
