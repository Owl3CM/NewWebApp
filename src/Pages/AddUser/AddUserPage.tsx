import { FormWrapper } from "@/Forms";
import { StepsContainer } from "@/Containers";
import AddUserService from "./AddUserService";

const AddUser = () => {
  const addUserService = AddUserService.Create();

  return (
    <FormWrapper service={addUserService}>
      <StepsContainer service={addUserService} />
    </FormWrapper>
  );
};

export default AddUser;
