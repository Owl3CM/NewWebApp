import Client from "@/Client";
import { CraftNestFromKeys } from "@/Forms";
import {} from "@/Libs/Eze-Elements";
import { ExtractIds, IHive, Status, createFormHive, createHive } from "@/Libs/eze-services";
import { Toast } from "@/Libs/eze-utils";
import { AddCategoryValidator, IAddCategoryFormHive, getCategoryInitialValue } from "./AddCategoryUtils";

type Step = "First" | "Last";
export type IAddUserService = ReturnType<typeof AddUserService.Create>;

export default class AddUserService {
  statusHive: IHive<Status>;
  formHive: IAddCategoryFormHive;

  constructor() {
    this.formHive = createFormHive({
      initialValue: getCategoryInitialValue(),
      validator: AddCategoryValidator(this),
      onSubmit: async (values) => {
        try {
          this.statusHive.setHoney("processing");
          const body = CraftNestFromKeys(values) as any;
          await Client.categoriesTag.AddCategory({ body });
          this.statusHive.setHoney("idle");
          Toast.success({ title: "success" });
          this.formHive.reset();
        } catch (err) {
          this.statusHive.setHoney("idle");
          Toast.error({ title: "error" });
        }
      },
    });
    this.statusHive = createHive("idle");
  }

  static Create = () => new AddUserService();
}
