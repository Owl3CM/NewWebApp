import { SelectorBase, MultiSelectorBase, IMultiSelectorListBuilder, IMultiSelectorBuilder } from "../kit";
import { ILabel, IconButton, IconInput, Label } from "@/Elements";
import { ILabeledController, IQueryProps, LabeledElement, QueryElement, QueryElementLabeled } from "../../ElementsContainers";
import { InputWithSelectorProps, MultiSelectorProps, SelectorProps } from "./types";
import { GetLabel, ILang } from "@/Language";

export const LabeledSelector = ({ label, customLabel, ...props }: SelectorProps & ILabel) => (
  <LabeledElement Element={Selector} label={label} customLabel={customLabel} {...props} />
);

export const Selector = ({
  label,
  customLabel,
  variant = "outline",
  icon = "alt-arrow-down-outline",
  error,
  hasParent = false,
  readonly,
  options,
  selectorLabel = "select",
  ...props
}: SelectorProps) => {
  options?.forEach((o) => (o.label = GetLabel(o.label as ILang)));
  return (
    <SelectorBase
      // label={GetLabel(label)}
      label={GetLabel(selectorLabel)}
      listClassName="selector-list overflow-auto"
      listContainerClass="selector-list-container"
      listBuilder={SelectorListBuilder}
      builder={SelectorButton({ variant, icon, error, hasParent, readonly, id: props.id })}
      // toggleOnSelect={false}
      options={options}
      {...props}
    />
  );
};

const SelectorButton =
  ({ error, icon, hasParent, variant, readonly, id }) =>
  ({ selected, options, toggleList }) =>
    (
      <IconButton
        error={error}
        onClick={({ e: { currentTarget } }) => {
          toggleList({ container: hasParent ? currentTarget.parentElement : currentTarget });
        }}
        icon={icon}
        iconPosition="end"
        containerClass="selector"
        variant={variant}
        customLabel={selected.displayName || selected.label}
        iconClass={`${options?.length > 1 ? "" : " opacity-20"}`}
        state={readonly ? "readonly" : undefined}
        id={id}
      />
    );

export const SelectorListBuilder = ({ options, onOptionChanged, selected }) => {
  return options.map((option: any, i: number) => (
    // option.visible !== false &&
    <p
      key={option.value}
      data-list-item-disabled={option.disabled}
      className="selector-list-item"
      data-selected-list-item={selected?.value === option.value}
      onClick={(e) => {
        e.stopPropagation();
        if (option.disabled) return;
        onOptionChanged(option, i);
      }}
      style={{
        display: option.visible !== false ? "block" : "none",
      }}>
      {option.label}
    </p>
  ));
};

export const MultiSelector = ({
  customLabel,
  variant = "outline",
  icon = "arrow-down-outline",
  error,
  hasParent = false,
  readonly,
  options,
  ...props
}: MultiSelectorProps) => {
  options?.forEach((o) => (o.label = GetLabel(o.label)));
  return (
    <MultiSelectorBase
      // placeholder={LangBuilder.select("daysOfWeek")}
      builder={MultiSelectorButton({ variant, icon, error, hasParent, readonly })}
      listBuilder={MultiSelectorListBuilder}
      listClassName="selector-list overflow-auto"
      listContainerClass="selector-list-container"
      options={options}
      {...props}
    />
  );
};

const MultiSelectorButton =
  ({ error, icon, hasParent, variant, readonly }) =>
  ({
    selected,
    unSelect,
    toggleList,
    options,
    inputClass = "icon-button icon-button-outline",
    inputValue,
    setInputValue,
    placeholder,
    selectAll,
    unSelectAll,
    select,
    setOptions: setProp,
  }: IMultiSelectorBuilder) => {
    return (
      <div className={`multi-selector gap-lg bg-outline`} data-readonly={readonly} data-form-error={error}>
        {/* <Icon icon={icon} className={`${options?.length > 1 ? "" : " opacity-20"}`} /> */}
        {/* options.map(
        (option: any) =>
          option.selected && ( */}
        {selected.map((option: any) => (
          <span
            key={option.value}
            className="selector-list-label"
            onClick={(e) => {
              e.stopPropagation();
              unSelect(option);
            }}>
            x <p>{option.label}</p>
          </span>
        ))}
        <input
          className={inputClass}
          value={inputValue}
          onChange={({ currentTarget }) => setInputValue(currentTarget.value)}
          placeholder={options?.some((o) => o.selected) ? "" : placeholder}
          onFocus={({ currentTarget }) => {
            toggleList({ container: currentTarget.parentElement as HTMLElement });
          }}
        />
      </div>
    );
  };

export const MultiSelectorListBuilder = ({
  options,
  select,
  noOptionsMessage,
  selectAll,
  unSelectAll,
  selected,
  setOptions,
  toggleList,
  unSelect,
}: IMultiSelectorListBuilder) => {
  const _Options = options.filter((o) => o.visible !== false && !o.selected);

  return _Options.length ? (
    _Options.map((option: any, i: number) => (
      <button
        type="button"
        key={option.value}
        data-list-item-disabled={option.disabled}
        className="selector-list-item"
        onClick={() => {
          if (option.disabled) return;
          select(option);
        }}>
        {option.label}
      </button>
    ))
  ) : (
    <p className="text-center">{noOptionsMessage}</p>
  );
};
