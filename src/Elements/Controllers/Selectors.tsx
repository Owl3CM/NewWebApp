import { IControllerProps } from "../types";
import { FormBee, IFormHive, INestedFormHive } from "@/Libs/eze-services";
import { ILabeledController, IQueryProps, ISilentLabeledController, QueryElement, QueryElementLabeled } from "../ElementsContainers";
import { ILang, LangBuilder } from "@/Language";
import {
  MultiSelector,
  MultiSelectorProps,
  PaginatorSelector,
  PaginatorSelectorControllerProps,
  PaginatorSelectorMulti,
  PaginatorSelectorProps,
  Selector,
  SelectorProps,
} from "../Selectors";

export function SelectorController<T>(props: SelectorProps & IControllerProps<T>) {
  return <ILabeledController Element={Selector} {...props} />;
}

export function MultiSelectorController<T>(props: SelectorProps & IControllerProps<T>) {
  return <ISilentLabeledController Element={MultiSelector} {...props} />;
}

export function PaginatorSelectorMultiController<T, R>(props: PaginatorSelectorControllerProps<T, R>) {
  return <ISilentLabeledController Element={PaginatorSelectorMulti} maxHeight="50vh" {...props} />;
}

export function PaginatorSelectorController<T, R>({ hive, id, label = id as ILang, takeFullValue = true, ...props }: PaginatorSelectorControllerProps<T, R>) {
  const _Hive = ((hive as IFormHive<T>).getNestedHive ? (hive as IFormHive<T>).getNestedHive(id) : hive) as INestedFormHive<T>;
  return (
    <FormBee
      hive={_Hive}
      Component={({ honey, validate, error }) => {
        return (
          <PaginatorSelector
            onChange={({ item, value }) => {
              validate(takeFullValue ? item : value);
            }}
            label={label}
            value={honey}
            error={error}
            id={id}
            {...props}
          />
        );
      }}
    />
  );
}

//! Query
export const SelectorQuery = (props: IQueryProps & SelectorProps) => <QueryElementLabeled Element={Selector} {...props} />;
export const MultiSelectorQuery = (props: IQueryProps & MultiSelectorProps) => <QueryElementLabeled Element={MultiSelector} {...props} />;

export const PaginatorSelectorQueryLabeled = ({ ...props }: IQueryProps & SelectorProps) => {
  return <QueryElement Element={PaginatorSelector} {...props} />;
};
// export function PaginatorSelectorQuery<R>({ id, label = id as ILang, queryBuilder, ...props }: IQueryProps & PaginatorSelectorProps<R>) {
//   const labelId = `${id}_Label`;
//   return (
//     <PaginatorSelector
//       selected={{
//         value: queryBuilder.get(id),
//         label: queryBuilder.get(labelId),
//       }}
//       onChange={({ value, label }) => {
//         queryBuilder.updateQueryParams([
//           { id, value },
//           { id: labelId, value: label },
//         ]);
//       }}
//       placeholder={LangBuilder.searchFor(label)}
//       // containerClass={"query-element"}
//       {...props}
//     />
//   );
//   // return <QueryElementLabeled Element={PaginatorSelector} {...props} />;
// }
