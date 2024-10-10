import React from "react";
import Svgs, { IconKey } from "./Svgs";
import GetIcon from "./Svgs";
export interface IconProps {
  icon: IconKey;
  className?: string;
  onClick?: (e: React.MouseEvent<any, MouseEvent>) => void;
  fill?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}
const Icon = ({ icon, className = "icon", onClick, fill, style, ...props }: IconProps) => {
  const founded = GetIcon(icon);
  return founded !== undefined ? (
    <svg className={className} onClick={onClick} fill={fill} viewBox={founded.viewBox} style={style} {...props}>
      {founded.pathes}
    </svg>
  ) : null;
};

export default Icon;
