import { ILang } from "@/Language";
import { Toast } from "@/Libs/eze-utils";

export default class AppErrors {
  static ShowError(content: ILang = "", title = "error") {
    Toast.error({ title, content });
  }
  static BackendError(error: any, title = "error") {
    AppErrors.ShowError(error.response.message?.error, title);
  }
  static TryCatch = (callback: () => any, title = "error") => {
    try {
      return callback();
    } catch (error) {
      AppErrors.ShowError(error.message, title);
    }
  };
  static BackendTryCatch = async (callback: () => any, title = "error") => {
    try {
      return await callback();
    } catch (error) {
      AppErrors.BackendError(error, title);
    }
  };
}
