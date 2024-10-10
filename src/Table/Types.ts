import { ILang } from "@/Language";

export type TableColumnDef<T> = {
  id: ILang | string;
  header?: string;
  visible?: boolean;
  colSpan?: number;
  cell?: (cell: T) => JSX.Element;
  hideOnPrint?: boolean;
  hideInHeader?: boolean;
};
