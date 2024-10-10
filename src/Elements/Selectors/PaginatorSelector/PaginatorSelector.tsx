import React from "react";
import PaginatorSelectorService from "./PaginatorSelectorService";
import { Bees, StatusBee } from "@/Libs/eze-services";
import { Label, SearchInput } from "@/Elements";
import { Wrapper } from "@/Containers";
import { ILang, LangBuilder } from "@/Language";
import { Icon } from "@/Assets";
import { TimedCallback } from "@/Libs/eze-utils";
import { PaginatorSelectorProps } from "./types";

export function PaginatorSelector<Response>({
  id,
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
        console.warn("PaginatorSelector: onChange is not defined", { value });
      },
  // new
  label,
  placeholder = LangBuilder.searchFor(label ?? "..."), //"بحث عن",
  error,
  value,
  maxHeight = "50vh",
  labelKey = "name",
  valueKey = "id",
  selected = value && typeof value === "object" ? { value: value[valueKey], label: value[labelKey] } : { value },
  debounce = 800,
  readonly,
}: PaginatorSelectorProps<Response>) {
  const service = React.useMemo(
    () => new PaginatorSelectorService({ getParams, onResponse, paginator, valueKey, id: queryKey, params: { ...params } }), //, [queryKey]: selected.label ?? "" } }),
    []
  );
  if (!selected.label && service.dataHive.honey.length > 0) {
    const item = service.dataHive.honey.find((item) => item[valueKey] == selected.value);
    console.log(service.dataHive.honey, selected);
    if (item) selected.label = item[labelKey];
  }

  return (
    <div
      data-readonly={readonly}
      ref={(ref) => ref && (service.container = ref)}
      aria-expanded={service.show}
      data-sprate="true"
      className={`api-selector-container col ${containerClass}`}
      style={{ maxWidth: "fit-content", "--max-height": maxHeight } as any}
      onKeyDown={(e) => {
        if (e.key === "Escape") service.toggle(false);
        else if (e.key === "Enter") {
          e.preventDefault();
          const input = service.container?.querySelector("input");

          const item = service.dataHive.honey.filter((item) => item[labelKey].includes(input.value))[0];
          console.log(e.key, item);
          if (item) {
            service.toggle(false);
            setTimeout(() => {
              input.value = item[labelKey];
              onChange({ value: item[valueKey], label: item[labelKey] });
            }, 300);
          }
        }
      }}>
      {/* <div className="row icon-input input-search"> */}
      {label && <Label label={label} className="mb-sm" />}
      <div className="kkk" data-form-error={error}>
        <Builder
          setValue={(value) => {
            TimedCallback.create({
              callback: () => {
                service.updateQueryParams({ [queryKey]: value });
              },
              id: queryKey,
              timeout: debounce,
            });
          }}
          variant="selector"
          onFocus={service.onFocus}
          // placeholder={GetLabel(placeholder ?? label)}
          placeholder={placeholder}
          value={selected["label"]}
          label={queryKey}
          id={id}
          // label={label}
        />
        <Icon
          id="clear-icon"
          icon="close-outline"
          className="self-center icon px-sm fill-red pointer absolute"
          onClick={({ currentTarget }) => {
            const input = service.container?.querySelector("input");
            const setInput = (value) => (input.value = value);
            setInput("");
            // input && (input.value = "");
            // service.toggle(false);
            service.updateQueryParams({ [queryKey]: "" });
            onChange({ value: "", label: "", setInput });
            currentTarget.style.opacity = "0";
          }}
          style={{ opacity: selected.value ? "1" : "0", left: 32 }}
        />
        <div
          onClick={() => {
            service.toggle();
          }}
          className="selector-arrow-container">
          <DefaultIcon options={service.dataHive.honey} />
        </div>
      </div>
      <Bees
        hiveCluster={{
          show: service.showHive,
          items: service.dataHive,
        }}
        Component={({ cell: { show, items } }) => (
          <div className="round-b-md" style={{ position: "relative", width: "100%", backgroundColor: "inherit" }}>
            {show ? (
              <>
                <div className="search-result-container">
                  <StatusBee service={service} {...defaultKit} {...stateKit} />
                  {/* <p className="sticky top-0">loading</p> */}
                  <Wrapper
                    // style={{ overflowY: "auto", overflowX: "hidden" }}
                    // className="overflow-auto col gap-lg"
                    service={service}
                    subscribeToStatus={false}>
                    {/* <JsonBuilder json={service.items} /> */}
                    {items.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          const input = service.container?.querySelector("input") as HTMLInputElement;
                          const clearIcon = service.container?.querySelector("#clear-icon") as HTMLElement;
                          const setInput = (value) => (input.value = value);
                          setInput(item[labelKey]);
                          clearIcon && (clearIcon.style.opacity = "1");
                          service.toggle(false);

                          // console.log({ item, valueKey, labelKey });

                          const _value = item[valueKey];
                          const _label = item[labelKey];
                          onChange({ item: { ...item }, value: _value, label: _label, setInput });
                        }}>
                        <LabelBuilder key={i} {...item} name={item[labelKey]} selected={selected.value === item[valueKey]} />
                      </div>
                    ))}
                    <div id="selector-load-more-holder" />
                  </Wrapper>
                </div>
              </>
            ) : null}
          </div>
        )}
      />
    </div>
  );
}

const _labelBuilder = ({ name, selected }) => {
  return (
    <p className={`search-result-item`} data-selected-list-item={selected}>
      {name}
    </p>
  );
};

const DefaultIcon = ({ options }) => (
  <svg
    height={8}
    width={14}
    id="toggle-arrow"
    style={{
      opacity: options.length > 0 ? 1 : 0.4,
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
