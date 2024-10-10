import { IconButtonVariant } from "./../../Buttons/types";
import { IconInputProps } from "./../../Inputs/types";
import { ILang } from "@/Language";
import { IListOption, IMultiSelectorProps, ISelectorProps } from "@/Elements/Selectors/forms-types";
import { IconKey } from "@/Assets";

export interface OLD_InputWithSelectorProps {
  service: any;
  inputId: string;
  selectorId: string;
  inputProps?: IconInputProps;
  selectorProps?: SelectorProps;
  options: IListOption[];
}
export interface InputWithSelectorProps {
  hive: any;
  id: string;
  inputKey: string;
  selectorKey: string;
  inputProps?: IconInputProps;
  selectorProps?: SelectorProps;
  options: IListOption[];
}

export interface SelectorProps extends ISelectorProps {
  id?: string;
  label?: ILang;
  variant?: IconButtonVariant;
  customLabel?: string;
  icon?: IconKey;
  error?: string;
  hasParent?: boolean;
  readonly?: boolean;
  selectorLabel?: ILang;
}
export interface MultiSelectorProps extends IMultiSelectorProps {
  id?: string;
  label?: ILang;
  variant?: IconButtonVariant;
  customLabel?: string;
  icon?: IconKey;
  error?: string;
  hasParent?: boolean;
  readonly?: boolean;
}
