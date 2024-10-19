import { ILang, Validation, ValidationBuilder } from "@/Language";
import { IAddUserService } from "./AddCategoryService";
import { IFormHive } from "@/Libs/eze-services";

const AddCategoryInitialValue = {
  name: "",
  description: "",
  image: "",
};

export type IAddCategoryFormHive = IFormHive<typeof AddCategoryInitialValue>;

export const getCategoryInitialValue = () => {
  return AddCategoryInitialValue;
};

type Key = keyof typeof AddCategoryInitialValue;
type ValueOf<T extends Key> = (typeof AddCategoryInitialValue)[T];
export const AddCategoryValidator = (service: IAddUserService) => (key: Key, value) => {
  return validators[key](value);
};

const validators = {
  name: (value: ValueOf<"name">) => (value.length > 0 ? null : "The name must be longer than 0"),
  description: (value: ValueOf<"description">) => (value.length > 0 ? null : "The description must be longer than 0"),
  image: (value: ValueOf<"image">) => {
    switch (true) {
      case value.length === 0:
        return "The image must be longer than 0";
      case !value.startsWith("http"):
        return "The image must be a valid URL";
      default:
        return null;
    }
  },
};
