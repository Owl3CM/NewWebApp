import { FormWrapper } from "@/Forms";
import { createFormHive, QueryBuilder } from "eze-services";
import { AddProductService } from "./AddProductService";
import { Form, Grid } from "@/Containers";
import { IconInputController, SelectorController, SelectorQuery } from "@/Elements";
import Client from "@/Client";

const AddProductsPage = () => {
  const addProductService = AddProductService.Create();
  const formHive = addProductService.formHive;

  return (
    <FormWrapper service={addProductService}>
      <Form formHive={formHive} submitBtnLabel="submit">
        <Grid>
          <IconInputController hive={formHive} id="name" />
          <IconInputController hive={formHive} id="description" />
          <IconInputController hive={formHive} id="image" />
          <IconInputController hive={formHive} id="cost_price" />
          <IconInputController hive={formHive} id="sale_price" />
          {/* TODO: fix this */}
          {/* <SelectorController hive={formHive} id="category_id" options={addProductService.categoriesHive.honey} /> */}
        </Grid>
      </Form>
    </FormWrapper>
  );
};

export default AddProductsPage;
