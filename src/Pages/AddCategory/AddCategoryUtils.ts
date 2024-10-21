import { IFormHive } from "@/Libs/eze-services";

const AddCategoryInitialState = {
  name: "",
  description: "",
  image: "",
};

export type IAddCategoryFormHive = IFormHive<typeof AddCategoryInitialState>;

export const getAddCategoryInitialValue = () => {
  return AddCategoryInitialState;
};

export const AddCategoryValidator = (service: any) => (key: any, value: any) => {
  return "";
};
