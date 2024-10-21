import { useParams } from "react-router-dom";

interface IQueryableProps {
  pathParams: any;
  navigate: any;
  location: any;
}
interface IQueryableResetProps {
  onQueryChange?: (query: any) => void;
  defaultQuery?: any;
  service?: {
    setQueryParams: (query: any) => void;
    updateQueryParams: (query: any) => void;
    queryParams?: any;
    queryParamsHive?: any;
  };
  hasPP?: boolean;
  id?: string;
}

export default class Queryable<T = any> {
  static onQueryChange: (queryParams: any) => void;
  private static ChangeRoute = () => {
    if (!this._isQueryChanged()) return;
    // SAVED[this.storageKey] = this.query || null;
    sessionStorage.setItem(this.storageKey, this.query);
    setTimeout(() => {
      this.navigate(`${window.location.pathname}?${this.query}`, { replace: true, preventScrollReset: true });
      this.onQueryChange(this.getAll());
    }, 1);
    return;
  };

  private static ID = "";

  static Reset = ({
    service,
    // id = service?.id,
    onQueryChange = service?.setQueryParams,
    defaultQuery = service?.queryParamsHive.honey,
    hasPP = false,
  }: IQueryableResetProps) => {
    // if (id === this.ID) return;
    // this.ID = id;
    if (hasPP) this.pathParams = useParams();
    else this.pathParams = {};
    this.storageKey = `url-query-${window.location.pathname}`;

    this.queryParams = {} as any;
    if (defaultQuery)
      Object.entries(defaultQuery).forEach(([key, value]) => {
        this.set({ id: key, value } as any);
      });
    this.onQueryChange = onQueryChange;

    const search = window.location.search; // || `?${sessionStorage.getItem(this.storageKey) ?? ""}`;
    new URLSearchParams(search).forEach((value, id) => this.set({ id, value } as any));
    this.query = this.toString();
    this.lastQuery = "Owl";

    this.ChangeRoute();
  };

  private static set = (queryParma: IQueryParam<keyof T>) => {
    if (hasValue(queryParma.value))
      Object.assign(this.queryParams, {
        [queryParma.id]: { value: queryParma.value, title: queryParma.title || "_" },
      });
    else delete this.queryParams[queryParma.id];
  };
  static get = (id: keyof T) => {
    const value = (this.queryParams[id] as any)?.value ?? this.pathParams?.[id];
    return hasValue(value) ? value : null;
  };
  static toString = () => {
    let str = "";
    Object.entries(this.queryParams).forEach(([key, value]: any) => {
      str += `${key}=${value.value}&`;
    });
    return str;
  };
  static getAll = () => {
    const obj: any = {};
    this.getQueryParams(obj);
    this.getPathParsms(obj);
    this.getStateParams(obj);
    return obj;
  };

  static getQueryParams = (obj: any = {}) => {
    Object.entries(this.queryParams).forEach(([key, value]: any) => {
      obj[key] = value?.value;
    });
    return obj;
  };

  static clearQueryParams = () => {
    this.setQueryParams({} as any);
  };

  static getPathParsms = (obj: any = {}) => {
    if (this.pathParams) {
      Object.entries(this.pathParams).forEach(([key, value]) => {
        obj[key] = value;
      });
    }
    return obj;
  };

  static getStateParams = (obj: any = {}) => {
    if (this.location?.state) {
      Object.entries(this.location.state).forEach(([key, value]) => {
        obj[key] = value;
      });
    }
    return obj;
  };

  static setQueryParams = (
    queries:
      | IQueryParam<keyof T>[]
      | { [key in keyof T]: IQueryParam<key> }
      | ((queries: { [key in keyof T]: IQueryParam<key> }) => { [key in keyof T]: IQueryParam<key> } | IQueryParam<keyof T>[]) = {} as any
  ) => {
    if (typeof queries === "function") queries = queries(this.queryParams);
    if (Array.isArray(queries)) {
      this.queryParams = {} as any;
      queries.forEach((query) => this.set(query));
    } else this.queryParams = queries;
    this.ChangeRoute();
  };

  static updateQueryParams = (queryParma: IQueryParam<keyof T> | IQueryParam<keyof T>[]) => {
    if (Array.isArray(queryParma)) queryParma.forEach((query) => this.set(query));
    else this.set(queryParma);
    this.ChangeRoute();
  };

  private static _isQueryChanged = () => {
    this.query = this.toString();
    const changed = this.query !== this.lastQuery;
    this.lastQuery = this.query;
    return changed;
  };

  private static lastQuery = "";
  static navigate: any;
  static location: any;
  static pathParams: any;
  static queryParams: { [key in keyof T]: IQueryParam<key> } = {} as any;
  static storageKey = "";
  static query = "";
  static Create = ({ pathParams, navigate, location }: IQueryableProps) => {
    this.pathParams = pathParams;
    this.navigate = navigate;
    this.location = location;
  };
}

export type IQueryable<T = any> = Queryable<T>;
export interface IQueryParam<K> {
  id: K;
  value: any;
  title?: string;
}

export const hasValue = (value: any) => ![undefined, "undefined", "null", "", "none"].includes(value);
