import { FormWrapper } from "@/Forms";
import { StepsContainer } from "@/Containers";
import AddUserService from "./AddUserService";
import AddUserLastStep from "./AddUserSteps/AddUserLastStep";

const AddUser = () => {
  const addUserService = AddUserService.Create();

  return (
    <FormWrapper service={addUserService}>
      <AddUserLastStep formHive={addUserService.formHive} />
      {/* <StepsContainer service={addUserService} /> */}
    </FormWrapper>
  );
};

export default AddUser;
