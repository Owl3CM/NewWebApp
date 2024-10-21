import { IAddUserService } from "../AddUserService";
import AddUserLastStep from "./AddUserLastStep";

export const getAddUserSteps = (addUserService: IAddUserService, template = null) => {
  const formHive = addUserService.formHive;
  return {
    First: {
      component: <AddUserLastStep formHive={formHive} />,
      label: "AddUserLastStep",
    },
    Last: {
      component: <AddUserLastStep formHive={formHive} />,
      label: "AddUserLastStep",
    },
  };
};
