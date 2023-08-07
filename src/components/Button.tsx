import { Link } from "react-router-dom";

import {
  Theme,
  primaryColor,
  gbBlue,
  gbRed,
  gbPurple
} from "../styles";

export interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  type?: 'link' | 'button' | undefined;
  to?: string;
  theme?: Theme;
  value?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  onDrop?: (e?: React.DragEvent) => void;
  onDragOver?: (e?: React.DragEvent) => void;
  onDragEnter?: (e?: React.DragEvent) => void;
}

const primaryStyle: React.CSSProperties = {
  color: 'white',
  backgroundColor: primaryColor
}

const gbBlueStyle: React.CSSProperties = {
  color: 'white',
  backgroundColor: gbBlue
}

const gbRedStyle: React.CSSProperties = {
  color: 'white',
  backgroundColor: gbRed
}

const gbPurpleStyle: React.CSSProperties = {
  color: 'white',
  backgroundColor: gbPurple
}

export const getButtonStyle = (theme: Theme, style?: React.CSSProperties) => {
  switch(theme) {
    case 'primary':
      return {
        ...primaryStyle,
        ...style
      };
    case 'gb-blue':
      return {
        ...gbBlueStyle,
        ...style
      }
    case 'gb-red':
      return {
        ...gbRedStyle,
        ...style
      }
    case 'gb-purple':
      return {
        ...gbPurpleStyle,
        ...style
      }
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
          disabled={props.disabled}
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
          disabled={props.disabled}
        >
          {props.children}
        </button>
      );
  }
}

export default Button;
