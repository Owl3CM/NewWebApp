import React from "react";
// import { StateListener, ServiceStateBuilder } from "@/Libs/eze-services";
import { Label, SearchInput } from "@/Elements";
import { Wrapper } from "@/Containers";
import { GetLabel, ILang, LangBuilder } from "@/Language";
import { Icon } from "@/Assets";
import { TimedCallback } from "@/Libs/eze-utils";
import PaginatorSelectorService from "./PaginatorSelectorService";
import { PaginatorSelectorProps } from "./types";

// export interface SelectorProps {
//   paginator: {
//     load: (params: any) => Promise<any>;
//     loadMore?: (params: any) => Promise<any>;
//     reload?: (params: any) => Promise<any>;
//   };
//   queryKey?: string;
//   setValue?: (value: any) => void;
//   onChange?: (item: any) => void;
//   containerClass?: string;
//   Builder?: any;
//   placeholder?: string;
//   labelBuilder?: any;
//   stateKit?: any;
//   params?: any;
//   onResponse?: any;
//   getParams?: any;
//   maxHeight?: string;
//   error?: any;
//   label?: ILang;
//   value?: any;
//   labelKey?: string;
//   valueKey?: string;
//   debounce?: number;
//   readonly?: boolean;
// }

export const PaginatorSelectorMulti = ({
  queryKey = "query",
  containerClass = "",
  Builder = SearchInput,

  labelBuilder: LabelBuilder = _labelBuilder,
  onResponse,
  params,
  getParams,
  stateKit = {},
  paginator = {
    load: () => {},
    loadMore: () => {},
    reload: () => {},
  } as any,

  setValue,
  onChange = setValue
    ? ({ value }) => setValue(value)
    : ({ value }) => {
        console.warn("PaginatorSelectorMulti: onChange is not defined", { value });
      },
  // new
  label,
  placeholder = LangBuilder.searchFor(label ?? "..."), //"بحث عن",
  error,
  value,
  maxHeight = "50vh",
  labelKey = "name",
  valueKey = "id",
  debounce = 800,
  readonly,
}: PaginatorSelectorProps) => {
  const service = React.useMemo(
    () =>
      new PaginatorSelectorService({
        onSelectChange: onChange,
        getParams,
        onResponse,
        paginator,
        valueKey,
        id: queryKey,
        params: { ...params },
      }),
    []
  );
  React.useEffect(() => {
    if (!Array.isArray(value)) {
      service.setSelected([]);
      return;
    }
    if (value.some((v) => !v.item)) value = value.map((v) => ({ item: v as any, value: v[valueKey], label: v[labelKey] }));

    service.setSelected(value);
  }, [value]);

  return <div>Not implemented! </div>;
  // return (
  //   <StateListener
  //     name="selected"
  //     service={service}
  //     Component={() => {
  //       return (
  //         <div
  //           data-readonly={readonly}
  //           ref={(ref) => ref && (service.container = ref)}
  //           aria-expanded={service.show}
  //           data-sprate="true"
  //           className={`api-selector-container col ${containerClass}`}
  //           style={{ maxWidth: "fit-content", "--max-height": maxHeight } as any}>
  //           {/* <div className="row icon-input input-search"> */}
  //           {label && <Label label={label} className="mb-sm" />}
  //           <div className="kkk" data-form-error={error}>
  //             <div
  //               className="multi-selector p-lg gap-lg"
  //               data-readonly={readonly}
  //               style={{ border: "none", maxWidth: "300px", backgroundColor: "transparent" }}>
  //               {service.selected.map((option: any) => (
  //                 <div
  //                   key={option.value}
  //                   className="selector-list-label"
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     service.unSelect(option);
  //                   }}>
  //                   x <p>{option.label}</p>
  //                 </div>
  //               ))}

  //               <input
  //                 className="flex-grow"
  //                 // value={selected["label"]}
  //                 onChange={({ currentTarget: { value } }) => {
  //                   TimedCallback.create({
  //                     callback: () => {
  //                       service.updateQueryParams({ [queryKey]: value });
  //                     },
  //                     id: queryKey,
  //                     timeout: debounce,
  //                   });
  //                 }}
  //                 placeholder={placeholder}
  //                 onFocus={service.onFocus}
  //               />
  //             </div>

  //             <Icon
  //               id="clear-icon"
  //               icon="close-outline"
  //               className="self-center icon px-sm fill-red pointer"
  //               onClick={({ currentTarget }) => {
  //                 const input = service.container?.querySelector("input");
  //                 input && (input.value = "");
  //                 // service.toggle(false);
  //                 service.updateQueryParams({ [queryKey]: "" });
  //                 service.setSelected([]);
  //                 currentTarget.style.opacity = "0";
  //               }}
  //               style={{ opacity: value?.length > 0 ? "1" : "0" }}
  //             />
  //             <div
  //               onClick={() => {
  //                 service.toggle();
  //               }}
  //               className="selector-arrow-container">
  //               <DefaultIcon options={service.items} />
  //             </div>
  //           </div>
  //           <StateListener
  //             name="show"
  //             service={service}
  //             Component={({ show }) => (
  //               <div className="round-b-md" style={{ position: "relative", width: "100%", backgroundColor: "inherit" }}>
  //                 {show ? (
  //                   <>
  //                     <div className="search-result-container">
  //                       <ServiceStateBuilder service={service} {...defaultKit} {...stateKit} />
  //                       {/* <p className="sticky top-0">loading</p> */}
  //                       <StateListener
  //                         name="items"
  //                         service={service}
  //                         Component={({ items }) => (
  //                           <Wrapper
  //                             style={{ maxHeight, overflowY: "auto", overflowX: "hidden" }}
  //                             service={service}
  //                             className="overflow-auto col gap-lg"
  //                             subscribeToStatus={false}>
  //                             {/* <JsonBuilder json={service.items} /> */}
  //                             {items.map((item, i) =>
  //                               service.selected.find((s) => s.value === item[valueKey]) ? null : (
  //                                 <div
  //                                   key={i}
  //                                   onClick={() => {
  //                                     const input = service.container?.querySelector("input") as HTMLInputElement;
  //                                     const clearIcon = service.container?.querySelector("#clear-icon") as HTMLElement;
  //                                     // input && (input.value = item[labelKey]);
  //                                     clearIcon && (clearIcon.style.opacity = "1");
  //                                     // service.toggle(false);
  //                                     const _value = item[valueKey];
  //                                     const _label = item[labelKey];
  //                                     service.select({ item: { ...item }, value: _value, label: _label });
  //                                   }}>
  //                                   <LabelBuilder key={i} {...item} name={item[labelKey]} />
  //                                 </div>
  //                               )
  //                             )}
  //                             <div id="selector-load-more-holder" />
  //                           </Wrapper>
  //                         )}
  //                       />
  //                     </div>
  //                   </>
  //                 ) : null}
  //               </div>
  //             )}
  //           />
  //         </div>
  //       );
  //     }}
  //   />
  // );
};

const _labelBuilder = ({ name }) => {
  return <p className={`search-result-item`}>{name}</p>;
};

const DefaultIcon = ({ options }) => (
  <svg
    height={8}
    width={14}
    id="toggle-arrow"
    style={{
      opacity: options?.length > 0 ? 1 : 0.4,
    }}
    className=""
    viewBox="0 0 512.02 319.26">
    <path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z" />
  </svg>
);

const defaultKit = {
  loading: () => <p>جاري التحميل...</p>,
  noContent: () => <p> لا توجد نتائج</p>,
  noMoreContent: () => <p>لا توجد المزيد</p>,
  loadingMore: () => <p>جاري تحميل المزيد...</p>,
  error: () => <p className="sticky bottom-0 bg-red">حدث خطأ</p>,
};
