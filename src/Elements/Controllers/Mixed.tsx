import { ILabel } from "../Labels/types";
import { ILabeledController, IQueryProps, LabeledElement, QueryElement } from "../ElementsContainers";
import { IconInput } from "../Inputs";
import { InputWithSelectorProps, Selector } from "../Selectors";
import { Label } from "../Labels/Labels";

export const LabeledInputWithSelectorController = ({ label, customLabel, ...props }: InputWithSelectorProps & ILabel) => (
  <LabeledElement Element={InputWithSelectorController} label={label} customLabel={customLabel} {...props} />
);

export const InputWithSelectorController = ({ hive, id, inputKey, selectorKey, options, selectorProps, inputProps, ...props }: InputWithSelectorProps) => {
  return (
    <ILabeledController
      hive={hive}
      id={id}
      Element={({ value, setValue, error }) => {
        let inputEror, selectorError, conatinerErr;
        if (error)
          if (typeof error === "string") conatinerErr = error;
          else {
            inputEror = error?.[inputKey];
            selectorError = error?.[selectorKey];
          }
        return (
          <div className={`selector-with-input   bg-outline`} data-form-error={conatinerErr}>
            <IconInput
              iconPosition="end"
              value={value[inputKey]}
              error={inputEror}
              id={inputKey}
              setValue={
                inputProps?.type === "number"
                  ? (inputValue) => {
                      value[inputKey] = parseInt(inputValue);
                      setValue(value);
                    }
                  : (inputValue) => {
                      value[inputKey] = inputValue;
                      setValue(value);
                    }
              }
              {...inputProps}
            />
            <Selector
              options={options}
              value={value[selectorKey]}
              error={selectorError}
              setValue={(selectorValue) => {
                value[selectorKey] = selectorValue;
                setValue(value);
              }}
              {...selectorProps}
              hasParent
            />
          </div>
        );
      }}
    />
  );
};

// export const LabeledInputWithSelectorController = ({ label, customLabel, ...props }: InputWithSelectorProps & ILabel) => (
//   <LabeledElement Element={InputWithSelectorController} label={label} customLabel={customLabel} {...props} />
// );

// export const InputWithSelectorController = ({ service, inputId, selectorId, options, selectorProps, inputProps, ...props }: InputWithSelectorProps) => (
//   <div className={`selector-with-input `} {...props}>
//     <IconInputController service={service} id={inputId} iconPosition="end" {...inputProps} />
//     <SelectorController service={service} id={selectorId} options={options} {...selectorProps} hasParent />
//   </div>
// );
//! Query
export const InputWithSelectorQuery = ({
  queryBuilder,
  selectorProps,
  inputProps,
  inputId,
  selectorId,
  options,
  customLabel,
  label,
  ...props
}: InputWithSelectorProps & IQueryProps) => (
  <div className="query-element-container">
    <Label className="query-label" customLabel={customLabel} label={label} />
    <div className={`selector-with-input`} {...props}>
      <QueryElement queryBuilder={queryBuilder} Element={IconInput} debounce={800} {...inputProps} id={inputId} />
      <QueryElement queryBuilder={queryBuilder} Element={Selector} {...selectorProps} hasParent id={selectorId} options={options} />
    </div>
  </div>
);
