import ItemsLoading from "./ItemsLoading";
import Loading from "./Loading";
import Error from "./Error";
import Progressing from "./Progressing";
import Searching from "./Searching";
import NoContent from "./NoContent";
import { ILang } from "@/Language";
import EmptyBill from "./EmptyBill";

const StateKit = {
  // error: null, // Error,
  error: Error, // Error,
  processing: Progressing,
  // searching: Searching,
  loading: Loading,
  // loadingMore: ItemsLoading,
  noContent: NoContent,
  noData: NoContent,
  empty: NoContent,
  // reloading: null,
  // idle: null,
  // emptyBill: EmptyBill,
};
export default StateKit;

export type IState = keyof typeof StateKit | "idle" | "loading" | "processing" | "reloading" | "searching" | "error" | "noContent" | "loadingMore";

export type ServiceState =
  | IState
  | { state: IState; props: any; parent?: HTMLElement | undefined }
  | {
      state: "noContent";
      props: {
        label: ILang;
      };
      parent?: HTMLElement | undefined;
    };
