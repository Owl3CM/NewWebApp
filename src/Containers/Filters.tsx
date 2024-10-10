import { GetLabel, ILang, LangBuilder } from "@/Language";
import { Icon } from "@/Assets";
import {
  Button,
  CheckBoxQuery,
  DateQuery,
  FormattedNumberQuery,
  InputWithSelectorQuery,
  NumberQuery,
  PaginatorSelectorQueryLabeled,
  SelectorQuery,
  TextQuery,
} from "@/Elements";
import { PopupMe } from "@/Libs/eze-spark";
import { IListOption } from "@/Elements/Selectors/forms-types";
import { QueryBuilder } from "@/Libs/eze-services";
import React, { Fragment } from "react";

type Props = {
  queryBuilder: QueryBuilder<any>;
  service: {
    filters?: FilterBuilder[];
    sorts?: any[];
  };
};

export const Sorts = ({ queryBuilder, service }: Props) => {
  return (
    service.sorts?.length > 0 && (
      <div
        className="button icon-button shadow-md button-primary"
        onClick={({ currentTarget: target }) => PopupSorts({ target, queryBuilder, sorts: service.sorts })}>
        <Icon icon="sort-outline" className="fill-white" />
      </div>
    )
  );
};
const PopupSorts = ({ target, queryBuilder, sorts }: SortsContentProps) => {
  const id = "sorts";
  const defaultSort = "sort-id";
  if (!queryBuilder.get(defaultSort)) {
    queryBuilder.queryParams[defaultSort] = { id: defaultSort, value: "desc" };
  }
  PopupMe(SortsContent, {
    id,
    target,
    componentProps: { queryBuilder, sorts } as SortsContentProps,
    childClass: "popup-filter",
    animation: "height",
  });
};

type SortsContentProps = {
  queryBuilder: QueryBuilder<any>;
  sorts: any[];
  [key: string]: any;
};

const SortsContent = ({ queryBuilder, sorts, popup }: SortsContentProps) => {
  const cancelSort = () => {
    const params = queryBuilder.queryParams;
    Object.keys(params).forEach((key) => {
      if (key.startsWith("sort-")) delete params[key];
    });
    queryBuilder.setQueryParams(params);
    popup.remove();
  };
  return (
    <div className="gap-lg col line-h:24px">
      <p onClick={cancelSort} className={`min-w-max row-center gap-lg text-red`}>
        {GetLabel("cancel")}
      </p>
      {sorts.map((sort) => {
        const { id, label } = typeof sort === "string" ? { id: sort, label: sort } : sort;
        const sortId = `sort-${id}`;
        const [value, setValue] = React.useState<string>(queryBuilder.get(sortId));
        const onChange = (value: string) => {
          queryBuilder.updateQueryParams({ id: sortId, value });
          setValue(value);
        };

        return (
          <Fragment key={id}>
            <DecsSortButton label={label} active={value === "desc"} onClick={() => onChange(value === "desc" ? undefined : "desc")} />
            <AscSortButton label={label} active={value === "asc"} onClick={() => onChange(value === "asc" ? undefined : "asc")} />
          </Fragment>
        );
      })}
    </div>
  );
};

const DecsSortButton = ({ label, active, onClick }) => {
  return (
    <div data-sort-active={active} onClick={onClick} className={`min-w-max row-center gap-lg`}>
      <Icon icon="sort-from-top-to-bottom-outline" className="py-sm" />
      {LangBuilder.sortsDesc(label)}
    </div>
  );
};

const AscSortButton = ({ label, active, onClick }) => {
  return (
    <div data-sort-active={active} onClick={onClick} className={`min-w-max row-center gap-lg`}>
      <Icon icon="sort-from-bottom-to-top-outline" className="py-sm" />
      {LangBuilder.sortsAsc(label)}
    </div>
  );
};

let QueryByType = {};

export const Filters = ({ queryBuilder, service }: Props) => {
  QueryByType = {
    string: TextQuery,
    // number: NumberQuery,
    number: FormattedNumberQuery,
    boolean: CheckBoxQuery,
    selector: SelectorQuery,
    "string-selector": InputWithSelectorQuery,
    "number-selector": InputWithSelectorQuery,
    "selector-api": PaginatorSelectorQueryLabeled,
    Date: DateQuery,
    Time: DateQuery,
    DateTime: (props) => <DateQuery {...props} type="datetime-local" />,
  };
  if (!service.filters.length) return null;
  const outOfPopupFilters = [];
  const inPopupFilters = [];
  service.filters?.map((filter) => {
    if (filter.placement === "InLine") outOfPopupFilters.push(filter);
    else inPopupFilters.push(filter);
  });
  return (
    <>
      {/* <Sorts queryBuilder={queryBuilder} service={service} /> */}
      {inPopupFilters.length > 0 && (
        <div
          className="button icon-button bg-prim shadow-md"
          onClick={({ currentTarget: target }) => PopupFilter({ target, queryBuilder, filters: inPopupFilters })}>
          <Icon icon="filter-outline" className="fill-primary" />
        </div>
      )}
      {outOfPopupFilters.map(({ type, ...props }, i) => {
        const Component = QueryByType[type] as any;
        return <Component key={i} queryBuilder={queryBuilder} {...props} />;
      })}
    </>
  );
};

type FiltersContentProps = {
  queryBuilder: QueryBuilder<any>;
  filters: FilterBuilder[];
  [key: string]: any;
};

const FiltersContent = ({ queryBuilder, filters, popup }: FiltersContentProps) => {
  return (
    <div className="col gap-lg">
      <Button
        label="cancelFilters"
        // variant="link"
        className="me-auto p-0"
        onClick={() => {
          const params = queryBuilder.queryParams;
          filters.forEach((filter: any) => {
            if (filter.type === "string-selector" || filter.type === "number-selector") {
              delete params[filter.inputId];
              delete params[filter.selectorId];
            } else delete params[filter.id];
          });
          queryBuilder.setQueryParams(params);
          popup.remove();
        }}
      />
      {filters.map(({ type, ...props }, i) => {
        const Component = QueryByType[type] as any;
        // if(!Component)return
        return <Component key={i} queryBuilder={queryBuilder} {...props} />;
      })}
    </div>
  );
};

type PopupFilterProps = {
  target: HTMLElement;
  queryBuilder: QueryBuilder<any>;
  filters: FilterBuilder[];
};

const PopupFilter = ({ target, queryBuilder, filters }: PopupFilterProps) => {
  const id = "filters";
  PopupMe(FiltersContent, {
    id,
    target,
    componentProps: { queryBuilder, filters } as FiltersContentProps,
    childClass: "popup-filter",
    animation: "height",
  });
};

type LoadCustomersParams = {
  FullName: string;
  PhoneNumber: string;
  BirthDay: string;
  //   IdGt: CustomerId;
  //   IdLt: CustomerId;
  Ids: CustomerId[];
  Query: string;
  Sort: string;
  Offset: number;
  Limit: number;
};

const testFilterObj: LoadCustomersParams = {
  FullName: "",
  PhoneNumber: "",
  BirthDay: "",
  //   IdGt: 0,
  //   IdLt: 0,
  Ids: [],
  Query: "",
  Sort: "",
  Offset: 0,
  Limit: 0,
};

type FilterType = "string" | "number" | "DateTime" | "Date" | "Time" | "boolean" | "selector" | "string-selector" | "number-selector" | "selector-api";

export type FilterBuilder = {
  type: FilterType;
  value?: any;
  label?: ILang;
  placement?: "InLine" | "InPopup" | "Auto";
} & (
  | {
      id: string;
      Element?: React.FC<any>;
    }
  | {
      id: string;
      type: "string" | "number" | "boolean" | "DateTime" | "Date" | "Time";
    }
  | {
      id: string;
      type: "selector";
      options: IListOption[];
    }
  | {
      type: "string-selector" | "number-selector";
      selectorId: string;
      inputId: string;
      options: IListOption[];
    }
  | {
      type: "selector-api";
      client: any;
    }
);

type FilterContainerBuilder = {
  className?: string;
  elements: FilterBuilder[];
};

// const filters: FilterContainerBuilder[] = [
//   {
//     // className: "",
//     elements: [
//       { type: "string", id: "query" },
//       { type: "string", id: "lol-string" },
//       { type: "number", id: "lol-number" },
//       { type: "boolean", id: "lol-boolean" },
//       {
//         type: "selector",
//         options: [
//           { label: "without", value: undefined, displayLabel: "amount" },
//           { label: "lol-nice", value: "lol-ok" },
//           { label: "lol-nice-2", value: "lol-2-ok" },
//           { label: "lol-nice-4", value: "lol-4-ok" },
//         ],
//       },
//       {
//         type: "number-selector",
//         selectorId: "lol-selectorId",
//         inputId: "lol-inputId",
//         options: [
//           { label: "nice", value: "lol" },
//           { label: "nice-2", value: "lol-2" },
//           { label: "nice-4", value: "lol-4" },
//         ],
//       },
//     ],
//   },
// ];
