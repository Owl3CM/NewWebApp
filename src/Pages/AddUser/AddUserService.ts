import Client from "@/Client";
import { Toast } from "@/Libs/eze-utils";
import { Status, createFormHive, createHive, IHive, ExtractIds } from "@/Libs/eze-services";
import { CraftNestFromKeys } from "@/Forms";
import { StepsProvider } from "@/Libs/Eze-Elements";
import { IAddUserFormHive, getAddUserInitialValue, AddUserValidator } from "./AddUserUtils";
import { getAddUserSteps } from "./AddUserSteps";

type Step = "First" | "Last";
export type IAddUserService = ReturnType<typeof AddUserService.Create>;

export default class AddUserService extends StepsProvider<Step> {
  statusHive: IHive<Status>;
  formHive: IAddUserFormHive;

  constructor() {
    super();
    this.formHive = createFormHive({
      initialValue: getAddUserInitialValue(),
      validator: AddUserValidator(this),
      onSubmit: async (values) => {
        const currStep = this.stepsControllerHive.honey.step;
        if (currStep !== "Last") {
          this.nextStep();
        } else {
          try {
            this.statusHive.setHoney("processing");
            const body = CraftNestFromKeys(values) as any;
            ExtractIds(body, ["reference_id"]);
            await Client.usersTag.AddUser({ body });
            this.statusHive.setHoney("idle");
            Toast.success({ title: "success" });
            this.formHive.reset();
          } catch (err) {
            this.statusHive.setHoney("idle");
            Toast.error({ title: "error" });
          }
        }
      },
    });
    this.statusHive = createHive("idle");
    this.changeSteps(getAddUserSteps(this) as any);
  }

  static Create = () => new AddUserService();
}
