import { ILang, Validation, ValidationBuilder } from "@/Language";
import { AddProductService } from "./AddProductService";
import { IFormHive } from "@/Libs/eze-services";

const AddProductInitialValue = {
  category_id: 0,
  cost_price: 0,
  description: "string",
  image: "string",
  name: "string",
  sale_price: 0,
};

export type IAddProductFormHive = IFormHive<typeof AddProductInitialValue>;

export const getProductInitialValue = () => {
  return AddProductInitialValue;
};

type Key = keyof typeof AddProductInitialValue;
type ValueOf<T extends Key> = (typeof AddProductInitialValue)[T];
export const AddProductValidator = (service: AddProductService) => (key: Key, value) => {
  // return validators[key](value);
  return null;
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
