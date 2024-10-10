import { IListOption } from "@/Elements/Selectors/forms-types";
import { ILang } from "@/Language";

type FilterBuilder = {
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
