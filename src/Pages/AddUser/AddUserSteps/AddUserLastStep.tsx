import { Form, Grid } from "@/Containers";
import { IAddUserFormHive } from "../AddUserUtils";
import { IconInputController, IconNumberController } from "@/Elements";

type Props = {
  formHive: IAddUserFormHive;
  prevStep?: () => void;
};

function AddUserLastStep({ formHive, prevStep }: Props) {
  return (
    <Form formHive={formHive} size="lg" validateKeys={["name", "password", "phone", "reference_id"]} prev={prevStep}>
      <Grid size="md">
        <IconInputController hive={formHive} id="name" />
        <IconInputController hive={formHive} id="password" />
        <IconInputController hive={formHive} id="phone" />
        <IconNumberController hive={formHive} id="reference_id" />
      </Grid>
    </Form>
  );
}

export default AddUserLastStep;
