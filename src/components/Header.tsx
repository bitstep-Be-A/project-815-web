import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  titleName?: string;
}

const Header: React.FC<HeaderProps> = ({
  titleName
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  return (
    <header className="flex flex-row items-center">
      {
        pathname !== '/' &&
        <button
          className="relative right-3 sm:right-8 w-6 h-6 md:text-lg md:text-xl"
          onClick={() => navigate(-1)}
        >&lt;</button>
      }
      <h1 className="md:text-5xl sm:text-3xl text-2xl">
        {titleName}
      </h1>
    </header>
  )
}

export default Header;
