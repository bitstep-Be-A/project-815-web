import { Link } from "react-router-dom";

import {
  Theme,
  primaryColor
} from "../styles";

export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  type?: 'link' | 'button' | undefined;
  to?: string;
  theme?: Theme;
  value?: string;
  children?: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  onDrop?: (e?: React.DragEvent) => void;
  onDragOver?: (e?: React.DragEvent) => void;
  onDragEnter?: (e?: React.DragEvent) => void;
}

const primaryStyle: React.CSSProperties = {
  color: 'white',
  backgroundColor: primaryColor
}

export const getButtonStyle = (theme: Theme, style?: React.CSSProperties) => {
  switch(theme) {
    case 'primary':
      return {
        ...primaryStyle,
        ...style
      };
    default:
      return style;
  }
}

const Button: React.FC<ButtonProps> = (props) => {
  switch(props.type) {
    case 'button':
      return (
        <button value={props.value}
          style={getButtonStyle(props.theme, props.style)}
          className={props.className}
          onClick={(e) => props.onClick && props.onClick(e)}
          onDrop={(e) => props.onDrop && props.onDrop(e)}
          onDragOver={(e) => props.onDragOver && props.onDragOver(e)}
          onDragEnter={(e) => props.onDragEnter && props.onDragEnter(e)}
        >
          {props.children}
        </button>
      );
    case 'link':
      if (!props.to) { throw new Error('Button의 link type은 to 속성이 필요합니다.') }
      return (
        <Link
          to={props.to}
          style={getButtonStyle(props.theme, props.style)}
          className={props.className}
        >
          {props.children}
        </Link>
      )
    default:
      return (
        <button value={props.value}
          style={getButtonStyle(props.theme, props.style)}
          className={props.className}
          onClick={(e) => props.onClick && props.onClick(e)}
          onDrop={(e) => props.onDrop && props.onDrop(e)}
          onDragOver={(e) => props.onDragOver && props.onDragOver(e)}
          onDragEnter={(e) => props.onDragEnter && props.onDragEnter(e)}
        >
          {props.children}
        </button>
      );
  }
}

export default Button;
