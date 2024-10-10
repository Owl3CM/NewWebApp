import { ILang } from "@/Language";
import { IconKey } from "@/Assets";
import { IconProps } from "@/Assets/Icons/Icon";

export type ILabel =
  | { label: ILang; customLabel?: string } //
  | { label?: ILang; customLabel: string };

export type LabelProps = ILabel & React.AllHTMLAttributes<HTMLParagraphElement>;

export type IconLabelVariant = "nice" | "test" | "info";
export type IconPosition = "start" | "end" | "top" | "bottom";

export interface NoVariants_IconLabelProps {
  icon?: IconKey;
  iconClass?: string;
  labelClass?: string;
  containerClass?: string;
  label?: ILang;
  customLabel?: string;
  iconPosition?: IconPosition;
  state?: string;
  [key: string]: any;
}

export interface IconLabelProps extends NoVariants_IconLabelProps {
  state?: IconLabelState;
  variant?: IconLabelVariant;
}

export interface NoVariants_IconsaLbelProps {
  startIcon?: IconProps;
  endIcon?: IconProps;
  labelClass?: string;
  containerClass?: string;
  label: ILang;
  customLabel?: string;
  [key: string]: any;
}
export interface IconsLabelProps extends NoVariants_IconsaLbelProps {
  variant?: IconLabelVariant;
  state?: IconLabelState;
}

export type IconLabelState = "idle" | "error" | "success" | "warning" | "info" | "disabled";
