import { Lang, GetLabel } from "@/Language";
import { Icon } from "@/Assets";
import { InputProps, IconInputProps, InputLabelProps, ISearchInputProps, IconsInputProps } from "./types";
import { Label } from "../Labels/Labels";
import { LabeledElement } from "../ElementsContainers";
import { Utils } from "@/Utils";

export const NakedInput = ({
  id,
  label = id,
  setValue,
  className = "",
  variant = "outline",
  customLabel,
  type,
  _ref,
  value,
  onChange = !setValue ? null : type === "number" ? ({ target: { valueAsNumber } }) => setValue(valueAsNumber) : ({ target: { value } }) => setValue(value),
  ...props
}: InputProps) => (
  <input
    ref={(ref) => {
      if (!ref) return;
      if (value === undefined || value === null) value = "";
      ref.value = value;
    }}
    id={id}
    // value={value}
    defaultValue={value}
    onChange={onChange}
    className={`${className} input-${variant}`}
    placeholder={GetLabel(label)}
    type={type}
    lang="en"
    autoComplete="off"
    onInput={(e) => {
      const value = (e.target as any).value;
      const newValue = Utils.numberToEnglish(value);
      if (value !== newValue) (e.target as any).value = newValue;
    }}
    {...props}
  />
);

export const TextArea = ({
  id,
  label,
  value,
  setValue,
  className = "",
  variant = "outline",
  onChange = setValue ? ({ target: { value } }) => setValue(value) : null,
  ...props
}: InputProps & { error?: string; register?: any }) => (
  <textarea
    ref={(ref) => {
      ref && value !== undefined && (ref.value = value);
    }}
    id={id}
    className={className}
    placeholder={GetLabel(label)}
    onChange={onChange as any}
    onInput={(e) => {
      const value = (e.target as any).value;
      const newValue = Utils.numberToEnglish(value);
      if (value !== newValue) (e.target as any).value = newValue;
    }}
    {...props}
  />
);

export const Input = ({ label, className = "input", variant = "outline", setValue, ...props }: InputProps) => (
  <NakedInput label={label} className={`${className}  input-${variant}`} {...props} />
);

export const InputLabel = ({ label, onClick, customLabel, error, containerClass, variant, className = "", onChange, ...props }: InputLabelProps) => (
  <div onClick={onClick} data-form-error={error} className={`icon-input ${containerClass} input-${variant}`}>
    <Label className="input-label" customLabel={customLabel} label={label} />
    <NakedInput //
      label={label}
      onChange={onChange as any}
      {...props}
    />
  </div>
);

export const IconInput = ({
  label,
  icon,
  iconClass = "",
  variant = "outline",
  containerClass = "",
  error,
  state,
  iconPosition,
  customLabel,
  style,
  readonly,
  ...props
}: IconInputProps) => {
  return (
    <div
      data-readonly={readonly}
      data-form-error={error}
      data-icon-position={iconPosition}
      data-element-state={state}
      className={`icon-input ${containerClass} input-${variant}`}>
      <NakedInput label={label} {...props} />
      <Icon icon={icon} className={iconClass} />
    </div>
  );
};
export const IconTextArea = ({
  label,
  icon,
  iconClass = "",
  variant = "outline",
  containerClass = "",
  error,
  state,
  iconPosition,
  customLabel,
  style,
  readonly,
  ...props
}: IconInputProps) => {
  return (
    <div
      data-readonly={readonly}
      data-form-error={error}
      data-icon-position={iconPosition}
      data-element-state={state}
      className={`icon-input ${containerClass} input-${variant}`}>
      <TextArea label={label} {...props} />
      <Icon icon={icon} className={iconClass} />
    </div>
  );
};

export const IconInputLabel = (props: IconInputProps) => <LabeledElement Element={IconInput} {...props} />;

export const IconsInput = ({ startIcon, endIcon, containerClass, iconClassName, variant = "outline", error, ...props }: IconsInputProps) => {
  return (
    <div data-form-error={error} className={`icon-input ${containerClass} input-${variant}`}>
      <Icon {...startIcon} />
      <NakedInput {...props} />
      <Icon {...endIcon} />
    </div>
  );
};
export const SearchInput = ({ label = "search", ...props }: ISearchInputProps) => {
  return <IconInput iconClass="fill-none" icon="search-outline" variant="search" placeholder={Lang[label ?? "search"] as any} iconPosition="end" {...props} />;
};

export const CheckBox = ({ type = "checkbox", variant = "checkbox", value, setValue, ...props }: InputProps) => (
  <InputLabel
    defaultChecked={value && value !== "false"}
    onClick={({ currentTarget, target }) => {
      let checked = currentTarget.querySelector("input").checked;
      if (target.nodeName !== "INPUT") {
        checked = !checked;
        currentTarget.querySelector("input").checked = checked;
      }
      setValue(checked);
    }}
    type={type}
    variant={variant}
    onChange={() => {}}
    {...props}
  />
);
