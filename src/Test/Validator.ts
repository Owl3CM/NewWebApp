import { GetLabel, ILang } from "@/Language";

const defaultErrorMessagesEnglish = {
  min: "{field} must be at least {value} characters",
  max: "{field} must be at most {value} characters",
  required: "{field} is required",
  gt: "{field} must be greater than {value}",
  lt: "{field} must be less than {value}",
  email: "Invalid email format for {field}",
  string: "{field} must be a string",
  number: "{field} must be a number",
  boolean: "Invalid boolean format",
  array: "Value must be an array",
  object: "Value must be an object",
  date: "Invalid date format",
  regex: "Invalid format",
  oneOf: "Value must be one of {value}",
  notOneOf: "Value must not be one of {value}",
  url: "Invalid URL format",
  uuid: "Invalid UUID format",
  integer: "Value must be an integer",
  positive: "Value must be positive",
  negative: "Value must be negative",
  hex: "Invalid hexadecimal format",
  ip: "Invalid IPv4 format",
  ipv6: "Invalid IPv6 format",
  macAddress: "Invalid MAC address format",
  json: "Invalid JSON format",
  time: "Invalid time format (HH:MM)",
  arrayLength: "Array length must be {value}",
  phoneNumber: "Invalid phone number format",
  postalCode: "Invalid postal code format",
  isoCountryCode: "Invalid ISO country code format",
  creditCardExpiry: "Expired credit card",
  passwordStrength: "Password must meet strength requirements",
  lowercase: "Value must be in lowercase",
  uppercase: "Value must be in uppercase",
  length: "Value length must be {value}",
  custom: "Invalid format",
  nonEmptyArray: "Array must not be empty",
  after: "Date must be after {value}",
  before: "Date must be before {value}",
  customCheck: "Must be test and not {value}",
};

const defaultErrorMessages = {
  min: "يجب أن يحتوي {field} على الأقل {value} من الأحرف",
  max: "يجب أن يحتوي {field} على الأكثر {value} من الأحرف",
  required: "{field} مطلوب",
  gt: "يجب أن يكون {field} أكبر من {value}",
  lt: "يجب أن يكون {field} أقل من {value}",
  email: "تنسيق البريد الإلكتروني غير صالح لـ {field}",
  string: "يجب أن يكون {field} نصًا",
  number: "يجب أن يكون {field} رقمًا",
  boolean: "تنسيق القيمة المنطقية غير صالح",
  array: "يجب أن تكون القيمة مصفوفة",
  object: "يجب أن تكون القيمة كائنًا",
  date: "تنسيق التاريخ غير صالح",
  regex: "التنسيق غير صالح",
  oneOf: "يجب أن تكون القيمة واحدة من {value}",
  notOneOf: "يجب ألا تكون القيمة واحدة من {value}",
  url: "تنسيق الرابط غير صالح",
  uuid: "تنسيق UUID غير صالح",
  integer: "يجب أن تكون القيمة عددًا صحيحًا",
  positive: "يجب أن تكون القيمة موجبة",
  negative: "يجب أن تكون القيمة سالبة",
  hex: "تنسيق القيمة الست عشرية غير صالح",
  ip: "تنسيق IPv4 غير صالح",
  ipv6: "تنسيق IPv6 غير صالح",
  macAddress: "تنسيق عنوان MAC غير صالح",
  json: "تنسيق JSON غير صالح",
  time: "تنسيق الوقت غير صالح (HH:MM)",
  arrayLength: "يجب أن يكون طول المصفوفة {value}",
  phoneNumber: "تنسيق رقم الهاتف غير صالح",
  postalCode: "تنسيق الرمز البريدي غير صالح",
  isoCountryCode: "تنسيق رمز الدولة ISO غير صالح",
  creditCardExpiry: "بطاقة الائتمان منتهية الصلاحية",
  passwordStrength: "يجب أن يفي كلمة المرور بمتطلبات القوة",
  lowercase: "يجب أن تكون القيمة بحروف صغيرة",
  uppercase: "يجب أن تكون القيمة بحروف كبيرة",
  length: "يجب أن يكون طول القيمة {value}",
  custom: "التنسيق غير صالح",
  nonEmptyArray: "يجب ألا تكون المصفوفة فارغة",
  after: "يجب أن يكون التاريخ بعد {value}",
  before: "يجب أن يكون التاريخ قبل {value}",
  customCheck: "يجب أن تكون (test) وليست {value}",
};

export default class Vee {
  private rules: Array<(value: any, context?: any) => string | undefined | Promise<string | undefined>> = [];
  private static config: any = defaultErrorMessages;
  private fieldName: string = "";

  constructor(fieldName?: string) {
    if (fieldName) this.fieldName = fieldName;
  }

  static Init(config: typeof defaultErrorMessages & { [key: string]: string }) {
    this.config = config;
  }

  protected getError(customMessage: any, key: string, value: any = "") {
    return ((customMessage || Vee.config[key]) ?? "").replace(`{value}`, value).replace(`{field}`, this.fieldName);
  }

  build(): (value: any) => string | undefined {
    const rules = [...this.rules];
    return (value: any) => {
      for (const rule of rules) {
        const error = rule(value) as string | undefined;
        if (error) return error;
      }
    };
  }
  //   build(): (value: any, context?: any) => string[] | undefined {
  //     return (value: any, context: any = {}) => {
  //       const errors: string[] = [];
  //       for (const rule of this.rules) {
  //         const error = rule(value, context);
  //         if (error) errors.push(error);
  //       }
  //       return errors.length ? errors : undefined;
  //     };
  //   }

  async buildAsync(): Promise<(value: any, context?: any) => Promise<string | undefined>> {
    return async (value: any, context: any = {}) => {
      for (const rule of this.rules) {
        const error = await rule(value, context);
        if (error) return error;
      }
    };

    // return async (value: any, context: any = {}) => {
    //   const errors: string[] = [];
    //   for (const rule of this.rules) {
    //     const error = await rule(value, context);
    //     if (error) errors.push(error);
    //   }
    //   return errors.length ? errors : undefined;
    // };
  }

  // Primitive Type Validations
  string(customMessage?: string) {
    const err = this.getError(customMessage, "string");
    this.rules.push((value: any) => {
      if (typeof value !== "string") return err;
    });
    return this;
  }

  number(customMessage?: string) {
    const err = this.getError(customMessage, "number");
    this.rules.push((value: any) => {
      if (typeof value !== "number") return err;
    });
    return this;
  }

  boolean(customMessage?: string) {
    const err = this.getError(customMessage, "boolean");
    this.rules.push((value: any) => {
      if (typeof value !== "boolean") return err;
    });
    return this;
  }

  array(customMessage?: string) {
    const err = this.getError(customMessage, "array");
    this.rules.push((value: any) => {
      if (!Array.isArray(value)) return err;
    });
    return this;
  }

  object(customMessage?: string) {
    const err = this.getError(customMessage, "object");
    this.rules.push((value: any) => {
      if (typeof value !== "object" || Array.isArray(value)) return err;
    });
    return this;
  }

  // Length and Range Validations
  min(minLength: number, customMessage?: string) {
    const err = this.getError(customMessage, "min", minLength);
    this.rules.push((value: any) => {
      if (typeof value === "string" && value.length < minLength) return err;
    });
    return this;
  }

  max(maxLength: number, customMessage?: string) {
    const err = this.getError(customMessage, "max", maxLength);
    this.rules.push((value: any) => {
      if (typeof value === "string" && value.length > maxLength) return err;
    });
    return this;
  }

  required(customMessage?: string) {
    this.rules.push((value: any) => {
      const err = this.getError(customMessage, "required");
      if (value === null || value === undefined || (typeof value === "string" && value.trim().length === 0)) return err;
    });
    return this;
  }

  // Number Validations
  gt(min: number, customMessage?: string) {
    const err = this.getError(customMessage, "gt", min);
    this.rules.push((value: any) => {
      if (value <= min) return err;
    });
    return this;
  }

  lt(max: number, customMessage?: string) {
    const err = this.getError(customMessage, "lt", max);
    this.rules.push((value: any) => {
      if (value >= max) return err;
    });
    return this;
  }

  integer(customMessage?: string) {
    const err = this.getError(customMessage, "integer");
    this.rules.push((value: any) => {
      if (!Number.isInteger(value)) return err;
    });
    return this;
  }

  positive(customMessage?: string) {
    const err = this.getError(customMessage, "positive");
    this.rules.push((value: any) => {
      if (value <= 0) return err;
    });
    return this;
  }

  negative(customMessage?: string) {
    const err = this.getError(customMessage, "negative");
    this.rules.push((value: any) => {
      if (value >= 0) return err;
    });
    return this;
  }

  // Additional Validations
  hex(customMessage?: string) {
    const hexRegex = /^[0-9a-fA-F]+$/;
    const err = this.getError(customMessage, "hex");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !hexRegex.test(value)) return err;
    });
    return this;
  }

  ip(customMessage?: string) {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const err = this.getError(customMessage, "ip");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !ipRegex.test(value)) return err;
    });
    return this;
  }

  ipv6(customMessage?: string) {
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/;
    const err = this.getError(customMessage, "ipv6");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !ipv6Regex.test(value)) return err;
    });
    return this;
  }

  macAddress(customMessage?: string) {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const err = this.getError(customMessage, "macAddress");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !macRegex.test(value)) return err;
    });
    return this;
  }

  json(customMessage?: string) {
    const err = this.getError(customMessage, "json");
    this.rules.push((value: any) => {
      try {
        JSON.parse(value);
      } catch (e) {
        return err;
      }
    });
    return this;
  }

  time(customMessage?: string) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const err = this.getError(customMessage, "time");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !timeRegex.test(value)) return err;
    });
    return this;
  }

  arrayLength(len: number, customMessage?: string) {
    const err = this.getError(customMessage, "arrayLength", len);
    this.rules.push((value: any) => {
      if (Array.isArray(value) && value.length !== len) return err;
    });
    return this;
  }

  // String Format Validations
  email(customMessage?: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const err = this.getError(customMessage, "email");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !emailRegex.test(value)) return err;
    });
    return this;
  }

  url(customMessage?: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    const err = this.getError(customMessage, "url");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !urlRegex.test(value)) return err;
    });
    return this;
  }

  uuid(customMessage?: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const err = this.getError(customMessage, "uuid");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !uuidRegex.test(value)) return err;
    });
    return this;
  }

  length(len: number, customMessage?: string) {
    const err = this.getError(customMessage, "length", len);
    this.rules.push((value: any) => {
      if (typeof value === "string" && value.length !== len) return err;
    });
    return this;
  }

  regex(pattern: RegExp, customMessage?: string) {
    const err = this.getError(customMessage, "regex");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !pattern.test(value)) return err;
    });
    return this;
  }

  // Array and Value Set Validations
  oneOf(options: any[], customMessage?: string) {
    const err = this.getError(customMessage, "oneOf", options.join(", "));
    this.rules.push((value: any) => {
      if (!options.includes(value)) return err;
    });
    return this;
  }

  notOneOf(options: any[], customMessage?: string) {
    const err = this.getError(customMessage, "notOneOf", options.join(", "));
    this.rules.push((value: any) => {
      if (options.includes(value)) return err;
    });
    return this;
  }

  nonEmptyArray(customMessage?: string) {
    const err = this.getError(customMessage, "nonEmptyArray");
    this.rules.push((value: any) => {
      if (Array.isArray(value) && value.length === 0) return err;
    });
    return this;
  }

  // Date Validations
  date(customMessage?: string) {
    const err = this.getError(customMessage, "date");
    this.rules.push((value: any) => {
      if (isNaN(Date.parse(value))) return err;
    });
    return this;
  }

  before(date: string, customMessage?: string) {
    const err = this.getError(customMessage, "before", date);
    this.rules.push((value: any) => {
      if (Date.parse(value) >= Date.parse(date)) return err;
    });
    return this;
  }

  after(date: string, customMessage?: string) {
    const err = this.getError(customMessage, "after", date);
    this.rules.push((value: any) => {
      if (Date.parse(value) <= Date.parse(date)) return err;
    });
    return this;
  }

  // Additional Validations
  phoneNumber(customMessage?: string) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const err = this.getError(customMessage, "phoneNumber");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !phoneRegex.test(value)) return err;
    });
    return this;
  }

  postalCode(customMessage?: string) {
    const postalRegex = /^[A-Za-z0-9]{3,10}$/;
    const err = this.getError(customMessage, "postalCode");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !postalRegex.test(value)) return err;
    });
    return this;
  }

  isoCountryCode(customMessage?: string) {
    const isoRegex = /^[A-Z]{2}$/;
    const err = this.getError(customMessage, "isoCountryCode");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !isoRegex.test(value)) return err;
    });
    return this;
  }

  creditCardExpiry(customMessage?: string) {
    this.rules.push((value: any) => {
      const today = new Date();
      const [month, year] = value.split("/");
      const err = this.getError(customMessage, "creditCardExpiry");
      const expiryDate = new Date(`20${year}-${month}-01`);
      if (expiryDate < today) return err;
    });
    return this;
  }

  passwordStrength(customMessage?: string) {
    const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const err = this.getError(customMessage, "passwordStrength");
    this.rules.push((value: any) => {
      if (typeof value === "string" && !strengthRegex.test(value)) return err;
    });
    return this;
  }

  lowercase(customMessage?: string) {
    const err = this.getError(customMessage, "lowercase");
    this.rules.push((value: any) => {
      if (typeof value === "string" && value !== value.toLowerCase()) return err;
    });
    return this;
  }

  uppercase(customMessage?: string) {
    const err = this.getError(customMessage, "uppercase");
    this.rules.push((value: any) => {
      if (typeof value === "string" && value !== value.toUpperCase()) return err;
    });
    return this;
  }

  // Custom Validator
  custom(rule: (value: any) => string | undefined) {
    this.rules.push(rule);
    return this;
  }
}

// ValidatorBuilder.Init({ ...defaultErrorMessages, required: "nice {field}", customCheck: "LOL" });

export class MyVee extends Vee {
  constructor(fieldName?: string) {
    super(fieldName);
  }

  static Create = (key?: ILang | string) => new MyVee(GetLabel(key as ILang));

  customCheck(customMessage?: string) {
    const err = this.getError(customMessage, "customCheck");
    return this.custom((value) => {
      if (value !== "test") return err;
    });
  }
  phone(customMessage?: string) {
    const err = this.getError(customMessage, "phone");
    return this.custom((value) => {
      // console.log(value.replace(" ", ""));
      // if (!value.replace(" ", "").match(/^\d{11}$/)) return err;
      // should match this
      // +9647831023674
      console.log(value);
      if (value.startsWith("+964")) {
        if (!value.match(/^\+964\d{10}$/)) return err;
      }
    });
  }
}

export const VeeIt = MyVee.Create;
