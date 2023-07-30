import { useState } from "react";

export interface TabNav {
  names: string[];
  className?: string;
  activeStyle?: React.CSSProperties;
  inactiveStyle?: React.CSSProperties;
}

interface TabProps {
  nav: TabNav;
  contents: React.ReactNode[];
  className?: string;
}

const Tab: React.FC<TabProps> = (props) => {
  const { contents, className } = props;

  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <div className={className}>
      <nav className={props.nav.className}>
        {
          props.nav.names.map((name, index) => (
            <button key={index} onClick={() => setActiveIdx(index)} style={
              activeIdx === index ? props.nav.activeStyle : props.nav.inactiveStyle
            }>
              {name}
            </button>
          ))
        }
      </nav>
      {contents[activeIdx]}
    </div>
  );
}

export default Tab;
