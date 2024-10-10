import { ILang } from "@/Language";
import { NoVariants_IconLabelProps, NoVariants_IconsaLbelProps } from "../Labels/types";

type ClickProps = {
  e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>;
  state: ButtonState;
  setState: (state: ButtonState) => void;
};
type ButtonClick = (props: ClickProps) => void;

export type ButtonProps = {
  label?: ILang;
  disabled?: boolean;
  selected?: boolean;
  variant?: IconButtonVariant;
  onClick?: ButtonClick;
  className?: string;
  customLabel?: string;
  state?: ButtonState;
  [key: string]: any;
};

export interface IconButtonProps extends NoVariants_IconLabelProps {
  onClick?: ButtonClick;
  variant?: IconButtonVariant;
  state?: ButtonState;
}
export interface DynamicIconButtonProps extends IconButtonProps {
  color?: string;
  bg?: string;
  border?: string;
}
export interface IconsButtonProps extends NoVariants_IconsaLbelProps {
  onClick?: ButtonClick;
  variant?: IconButtonVariant;
  state?: ButtonState;
}
export interface IconLinkButtonProps extends IconButtonProps {
  to: string;
}
export type IconButtonVariant = "primary" | "table-action" | "ghost" | "danger" | "link" | "outline" | "form-action" | "selector" | "big-icon";

export type ButtonState = "" | "not-selected" | "idle" | "disabled" | "selected" | "active" | "loading" | "error" | "success" | "warning" | "info";
