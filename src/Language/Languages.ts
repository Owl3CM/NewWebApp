import { ar_permissions } from "./ar/permissions";
const ar_Builder = {
  errorWhile: (action: ILang) => `حدث خطأ أثناء ${Lang[action]}`,
  delete: (title: ILang) => `حذف ال${GetLabel(title)}`,
  deleteAction: (title: ILang) => `هل انت متأكد من حذف (${GetLabel(title)})؟`,
  getFormError: (key: any, value: any) => {
    if (value === "NullOrEmpty") return `هذا الحقل مطلوب`;
    return `${GetLabel(key)}: ${GetLabel(value)}`;
  },
  maximumCharacters: (title: ILang, count: number) => `${GetLabel(title)} يجب ان لايتجاوز ال ${count} حرف`,
};

const arActions = {
  addDiscounts: "اضافة خصم",
  makeAllAsSeen: "جعل الكل مقروء",
   submit: "ارسال",
};
const ar_Enems = {};

const ar = {
  ...ar_permissions,
  ...ar_Enems,
  ...arActions,
  item: "مادة",
  categoryName: "اسم المجموعة",
  image: "الصورة",
  description: "الوصف",
  name: "الاسم",
};

const Languages = {
  ar,
};

const Lang = Languages.ar;
export const GetLabel = (key: ILang) => (Lang[key] || key) as string;
export type ILang = keyof typeof Lang;
export default Lang;

export const LangBuilder = {
  decrypt: (str: string) => {
    const [action, ...values] = str.split(":");
    const actBuilder = LangBuilder[action as any];
    if (actBuilder) return actBuilder(...values);
    return str;
  },
  ...ar_Builder,
};
export type ILangBuilder = keyof typeof LangBuilder;

export const Validation = {
  fieldIsRequired: "هذا الحقل مطلوب",
};

export const ValidationBuilder = {
  required: (title: ILang) => `${GetLabel(title)} مطلوب`,
  min: (count: number, title: ILang) => `${Lang[title]} يجب ان يكون اكبر من ${count}`,
  max: (count: number, title: ILang) => `${Lang[title]} يجب ان يكون اقل من ${count}`,
};
export type IValidation = keyof typeof Validation;

const languageKey = localStorage.getItem("language") || "ar";
// Todo uncomment this line
// const Language = Languages[languageKey];

export const ExtractNameOrTitle = (item: any) => {
  let nameKey = Object.keys(item).find((key) => key.includes("name") || key.includes("Name"));
  if (!nameKey) nameKey = Object.keys(item).find((key) => key.includes("title") || key.includes("Title"));
  return item[nameKey];
};
