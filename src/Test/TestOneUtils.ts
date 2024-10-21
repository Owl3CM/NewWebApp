import { ILang, Validation, ValidationBuilder } from "@/Language";
import { IFormHive } from "@/Libs/eze-services";
import TestOneService from "./TestOneService";

const TestOneInitialValue = {
  name: "",
  test: {
    age: 0,
  },
};

export type ITestOneFormHive = IFormHive<typeof TestOneInitialValue>;

export const getTestOneInitialValue = () => {
  return TestOneInitialValue;
};

export const getTestOneValidator = (service: TestOneService) => (key, value) => {
  return "";
  return value ? "" : ValidationBuilder.required(key as ILang);
};

export const getValidateKeysFromStep = ({ step }) => {
  return {}[step] || [];
};
