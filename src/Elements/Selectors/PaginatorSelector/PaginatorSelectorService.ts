import { listnToOutsideClick } from "@/Utils";
import { PaginatorService, createHive, State } from "@/Libs/eze-services";
import { useMemo } from "react";

export type IPaginatorSelectorService = PaginatorSelectorService;

export default class PaginatorSelectorService extends PaginatorService<IPaginatorSelectorService, any, State> {
  container = null as HTMLElement;
  show = false;
  params: any = {};

  setShow = (show: boolean) => {
    this.show = show;
    // this.container.setAttribute("aria-expanded", show.toString());
    this.showHive.setHoney(show);
  };
  // items: any[] = [];

  toggle = (show = !this.show) => {
    if (!show) {
      this.container.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        this.setShow(false);
      }, 190);
    } else {
      // if (this.items?.length > 0) {
      this.setShow(true);
      this.container.setAttribute("aria-expanded", "true");
      listnToOutsideClick({ event: () => this.toggle(false), selector: this.container });
      // } else
      this.onChange();
    }
  };
  onFocus = () => this.toggle(true);
  onChange = () => {};
  selected = [];
  setSelected = (selected: any) => {
    this.selected = selected;
    this.onSelectChange(this.selected);
  };
  select = (item: any) => {
    this.selected = [...this.selected, item];
    this.setSelected(this.selected);
    this.onSelectChange(this.selected);
  };
  unSelect = (item: any) => {
    this.selected = this.selected.filter((i) => i !== item);
    this.setSelected(this.selected);
    this.onSelectChange(this.selected);
  };
  // onSelectedChanged = (selected: any) => {
  //   this.onSelectChange(selected);
  // };
  private onSelectChange = (selected: any[]) => {};
  showHive = createHive(false);
  setItems = (items: any[] | ((prev: any[]) => any[])) => {
    this.dataHive.setHoney(items);
  };

  constructor({ params, onResponse, paginator, getParams, valueKey, id, onSelectChange }: Props) {
    super({
      paginator,
      onResponse: async ({ data, clear, hasMore }) => {
        if (data?.length > 0) {
          if (onResponse) data = onResponse(data);
          this.setItems((prev) => (clear ? data : [...prev, ...data]));
          // if (!this.show) this.toggle(true);
          this.statusHive.setHoney("idle");
        } else {
          this.statusHive.setHoney({
            state: "noContent",
            // parent: this.container?.querySelector("#selector-load-more-holder"),
            props: this.queryParamsHive.honey,
          });
          this.setItems([]);
        }
        this.canLoadHive.setHoney(hasMore);
      },
      beforeLoadMore: async () => {
        this.statusHive.setHoney({
          state: "loadingMore",
          parent: this.container?.querySelector("#selector-load-more-holder"),
        });
      },
    });
    if (onSelectChange) {
      this.onSelectChange = onSelectChange;
    }
    // this.queryParamsHive = { ...params };
    this.queryParamsHive.silentSetHoney({ ...params });
    delete params[id];
    this.onChange = getParams
      ? () => {
          if (this.statusHive.honey !== "idle") return;
          const changed =
            !this.dataHive.honey.length ||
            Object.entries(getParams()).some(([key, value]) => {
              return this.queryParamsHive.honey[key] !== value;
            });
          if (changed) this.updateQueryParams(getParams());
        }
      : () => {
          if (this.statusHive.honey !== "idle") return;
          const changed = !this.dataHive.honey.length;
          if (changed) this.updateQueryParams(this.queryParamsHive.honey);
        };
  }
  static Create = (props: Props) => useMemo(() => new PaginatorSelectorService(props), []);
}

interface Props {
  paginator: any;
  params?: any;
  onResponse?: (data: any[]) => any[];
  getParams?: () => any;
  valueKey?: string;
  id?: string;
  onSelectChange?: (selected: any[]) => void;
}
