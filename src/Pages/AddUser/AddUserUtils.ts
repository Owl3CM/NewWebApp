import { ILang, Validation, ValidationBuilder } from "@/Language";
import { IAddUserService } from "./AddUserService";
import { IFormHive } from "@/Libs/eze-services";

const AddUserInitialValue = {
  name: "",
  password: "",
  phone: "",
  reference_id: "",
};

export type IAddUserFormHive = IFormHive<typeof AddUserInitialValue>;

export const getAddUserInitialValue = () => {
  return AddUserInitialValue;
};

export const AddUserValidator = (service: IAddUserService) => (key, value) => {
  return "";
  return value ? "" : ValidationBuilder.required(key as ILang);
};

export const getValidateKeysFromStep = ({ step }) => {
  return {}[step] || [];
};
