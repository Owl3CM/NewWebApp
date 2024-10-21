import { Form, Grid } from "@/Containers";
import { IAddUserFormHive } from "../AddUserUtils";
import { IconInputController, IconNumberController, SelectorController } from "@/Elements";

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
        <SelectorController
          hive={formHive}
          id="name"
          options={[
            { label: "One", value: 1 },
            { label: "Two", value: 2 },
            { label: "Three", value: 3 },
          ]}
        />
      </Grid>
    </Form>
  );
}

export default AddUserLastStep;
