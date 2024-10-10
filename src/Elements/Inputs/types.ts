import { NoVariants_IconLabelProps, NoVariants_IconsaLbelProps } from "../Labels/types";
import { ILang } from "@/Language";
import { IControllerProps } from "../types";
import { IconKey } from "@/Assets";
import { IconProps } from "@/Assets/Icons/Icon";

export interface IInput {
  value?: any;
  defaultValue?: string;
  title: ILang;
  setValue?: (value: any, attribute?: any) => void;
  className?: string;
  readOnly?: boolean;
  type?: InputType;
  required?: boolean;
  autoFocus?: boolean;
  disableArrow?: boolean;
}
export interface InputProps {
  label?: ILang;
  variant?: IconInputVariant;
  register?: any;
  setValue?: any;
  defaultValue?: any;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  // id?: any;
  type?: InputType;
  customLabel?: string;
  error?: string;
  [key: string]: any;
}
export interface IconInputProps extends NoVariants_IconLabelProps {
  variant?: IconInputVariant;
  state?: InputState;
  size?: InputSize;
  placeholder?: ILang;
  defaultValue?: any;
  value?: any;
  setValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: InputType;
  error?: string;
  min?: number | string;
  max?: number | string;
  readonly?: boolean;
  disabled?: boolean;
  [key: string]: any;
}
// export interface IconsInputProps extends NoVariants_IconsaLbelProps {}

export interface ISearchInputProps extends Omit<InputProps, "onChange"> {
  label?: ILang;
}

export interface IconsInputProps extends InputProps {
  startIcon?: IconProps;
  endIcon?: IconProps;
  containerClass?: string;
}

export type IconInputVariant = "default" | "bordered" | "ghost" | "search" | "outline";
export type InputState = "" | "error" | "success";
export type InputSize = "default" | "small" | "large";

export interface InputLabelProps extends InputProps {
  containerClassName?: string;
}

export type IInputController<T> = IControllerProps<T>;

export type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "search"
  | "url"
  | "date"
  | "time"
  | "datetime-local"
  | "month"
  | "week"
  | "file"
  | "color";
