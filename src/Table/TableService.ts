import { PaginatorService, Status as EzeStatus, createHive, PagenatedServiceConstructor, IHiveArray, IHive, createHiveArray } from "@/Libs/eze-services";
import { CellBuilder } from "./CellBuilder/TableCellsBuilder";
import { TableColumnDef } from "./Types";
import { GetLabel, ILang } from "@/Language";

type ViewType = "table" | "cards";
export class TableService<QueryParams, Response, FormattedResponse = Response, Statua = EzeStatus> extends PaginatorService<
  QueryParams,
  Response,
  FormattedResponse,
  Statua
> {
  columns: TableColumnDef[];
  defaultColumns: any[];
  showIndex: boolean;
  id: string;
  viewTypeHive: IHive<ViewType>;
  // data = createHive([]);
  selectedItemsHive = createHiveArray([]);

  toggleItemSelection = (item: any) => {
    if (this.selectedItemsHive.honey.some((_item) => item.id === _item.id)) {
      this.selectedItemsHive.removeById(item.id);
    } else this.selectedItemsHive.push(item);
  };

  visibleColumns: TableColumnDef[];
  setVisibleColumns = (cols: TableColumnDef[]) => {
    this.visibleColumns = cols;
    this.columnsHive.setHoney(cols as any);
  };
  columnsHive = createHive<TableColumnDef>([] as any);
  toggleColumnVisibility = (col: TableColumnDef) => {
    col.visible = !col.visible;
    this.setVisibleColumns(this.columns.filter((col) => col.visible));
    this.storeColums();
  };
  onVisibleColumnsChanged = () => {};
  toggleColumnsBtnVisible: boolean;

  resetColumns = () => {
    this.columns.forEach((col, i) => {
      col.visible = this.defaultColumns[i].visible;
    });
    this.setVisibleColumns(this.columns.filter((col) => col.visible !== false || col.hideInHeader));
    this.clearStoredColumns();
  };
  toggleAllColumns = (val?: boolean) => {
    this.columns.forEach((col) => {
      col.visible = val;
    });
    this.setVisibleColumns(this.columns.filter((col) => col.visible !== false || col.hideInHeader));
    this.storeColums();
  };
  private storeKey = "";
  private storeColums = () => {
    // this.passedColumnsObjRef.forEach((col) => {
    //   col.visible = this.columns.find((c) => c.id === col.id).visible;
    // });
    localStorage.setItem(this.storeKey, JSON.stringify(this.columns));
  };
  private getStoredColumns = () => {
    return JSON.parse(localStorage.getItem(this.storeKey)) ?? [];
  };
  private clearStoredColumns = () => {
    localStorage.removeItem(this.storeKey);
  };
  private restoreColumns = () => {
    const localColumns = this.getStoredColumns();
    this.columns = this.defaultColumns.map((col, i) => {
      const visible = (localColumns.find((c) => c.id === col.id) ?? { visible: col.visible }).visible;
      return { ...col, visible };
    });
    this.setVisibleColumns(this.columns.filter((col) => col.visible !== false || col.hideInHeader));
  };
  // passedColumnsObjRef;

  constructor({
    columns,
    toggleColumnsBtnVisible,
    showIndex,
    storeKey,
    ...props
  }: Props & PagenatedServiceConstructor<QueryParams, Response, FormattedResponse>) {
    super(props);
    this.viewTypeHive = createHive<ViewType>("table", {
      storage: "localStorage",
      storeKey: this.id + "-view-type",
    });
    // this.passedColumnsObjRef = columns;
    this.showIndex = showIndex !== false;
    this.toggleColumnsBtnVisible = toggleColumnsBtnVisible !== false;
    if (!storeKey) storeKey = this.id ?? window.location.pathname;
    this.storeKey = `table_columns_${storeKey || window.location.pathname}`;
    this.defaultColumns = columns.map((col) => {
      col.visible = col.visible !== false;
      if (!col.cell) col.cell = (item: any) => CellBuilder(item[col.id]);
      if (!col.header) col.header = col.id;
      col.header = GetLabel(col.header as ILang);
      return col;
    });
    this.restoreColumns();
  }

  static clearAllStoreColumns = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("table_columns_")) {
        localStorage.removeItem(key);
      }
    });
  };

  static clearStoreColumns = (storeKey: string) => {
    localStorage.removeItem(`table_columns_${storeKey}`);
  };
}

export type ITableService = TableService<any, any, any, any>;
type Props = {
  columns: TableColumnDef[];
  toggleColumnsBtnVisible?: boolean;
  paginator: any;
  onResponse?: any;
  showIndex?: boolean;
  storeKey?: string;
};
