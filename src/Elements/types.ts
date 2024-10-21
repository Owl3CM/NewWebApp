import { ILang } from "@/Language";
import { IFormHive, INestedFormHive } from "@/Libs/eze-services";

export type IControllerProps<T> = {
  hive: IFormHive<T>;
  id?: keyof T;
  label?: ILang;
};
