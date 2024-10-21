import { FormatInputAsNumber, StringToFormattedNumber } from "@/Utils";
import { Controller, ILabeledController, IQrLabeledController, IQueryProps, QueryElementLabeled } from "../ElementsContainers";
import { IconTextArea, IconInput, IconsInput, InputLabel, CheckBox, TextArea, SearchInput } from "../Inputs";
import { IInputController, IconsInputProps, InputProps } from "../Inputs/types";

export function FormattedInputController<T>(props: IInputController<T>) {
  return <ILabeledController Element={IconInput} {...props} {...FormatInputAsNumber} />;
}
export function IconInputController<T>(props: IInputController<T>) {
  return <ILabeledController Element={IconInput} {...props} />;
}
export function TextAreaController<T>(props: IInputController<T>) {
  return <ILabeledController Element={IconTextArea} {...props} />;
}
export function IconsInputController<T>(props: IInputController<T> & IconsInputProps) {
  return <ILabeledController Element={IconsInput} {...props} />;
}
// export function PhoneController<T>(props: IInputController<T>) {
//   return <ILabeledController Element={IconInput} {...props} />;
// }
export function CheckBoxController<T>(props: IInputController<T>) {
  return <Controller Element={CheckBox} {...({ label: props.id, ...props } as any)} />;
}
export function IconNumberController<T>(props: IInputController<T>) {
  return <ILabeledController Element={IconInput} type="number" {...props} />;
}
export function IconInputQrController<T>(props: IInputController<T>) {
  return <IQrLabeledController Element={IconInput} {...props} />;
}

//! Query

export const TextQuery = (props: IQueryProps & InputProps) => {
  return <QueryElementLabeled Element={IconInput} debounce={800} {...props} />;
};
export const NumberQuery = (props: IQueryProps & InputProps) => {
  return <QueryElementLabeled Element={IconInput} debounce={800} type="number" {...props} />;
};
export const FormattedNumberQuery = (props: IQueryProps & InputProps) => {
  return (
    <QueryElementLabeled
      Element={({ value, setValue, ...props }) => {
        console.log(props);
        return (
          <IconInput
            {...props}
            value={StringToFormattedNumber(value)}
            setValue={(value) => {
              setValue(value?.replace(/[^0-9.]/g, ""));
            }}
            {...FormatInputAsNumber}
          />
        );
      }}
      debounce={800}
      // type="number"
      {...props}
    />
  );
};
export const SearchQuery = (props: IQueryProps & InputProps) => {
  return <QueryElementLabeled Element={SearchInput} debounce={800} label="" {...props} />;
};
export const TextAreaQuery = (props: IQueryProps & InputProps) => {
  return <QueryElementLabeled Element={TextArea} debounce={800} {...props} />;
};
export const CheckBoxQuery = (props: IQueryProps & InputProps) => {
  return <QueryElementLabeled Element={CheckBox} {...props} />;
};
