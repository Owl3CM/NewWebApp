import { Form, Grid } from "@/Containers";
import { IconInputController } from "@/Elements";
import { FormWrapper } from "@/Forms";
import AddCategoryService from "./AddCategoryService";

const AddCategory = () => {
  const addCategoryService = AddCategoryService.Create();
  const formHive = addCategoryService.formHive;
  return (
    <FormWrapper service={addCategoryService}>
      <Form formHive={formHive} submitBtnLabel="submit">
        <Grid>
          <IconInputController hive={formHive} id="name" />
          <IconInputController hive={formHive} id="description" />
          <IconInputController hive={formHive} id="image" />
        </Grid>
      </Form>
    </FormWrapper>
  );
};

export default AddCategory;
