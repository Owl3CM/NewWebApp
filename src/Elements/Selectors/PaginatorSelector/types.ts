import { IControllerProps } from "@/Elements/types";
import { ILang } from "@/Language";

export type PaginatorSelectorProps<Response> = {
  paginator: {
    load: (params?: any) => Promise<Response[]>;
    loadMore?: () => Promise<Response[]>;
    reload?: (params?: any) => Promise<Response[]>;
    hasMore?: boolean;
    limit?: number;
  };
  queryKey?: string;
  setValue?: (value: any) => void;
  onChange?: (item: any, setInput) => void;
  containerClass?: string;
  Builder?: any;
  placeholder?: string;
  labelBuilder?: any;
  stateKit?: any;
  params?: any;
  getParams?: any;
  maxHeight?: string;
  error?: any;
  label?: ILang;
  value?: any;
  selected?: { value: any; label: string };
  debounce?: number;
  readonly?: boolean;
} & {
  labelKey?: undefined;
  valueKey?: undefined;
  onResponse?: (response: Response[]) => { name: string | number; id: string | number }[];
};

export type PaginatorSelectorControllerProps<T, R> = PaginatorSelectorProps<R> &
  IControllerProps<T> & {
    takeFullValue?: boolean;
  };
