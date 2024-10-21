import { FormWrapper } from "@/Forms";
import { createFormHive, QueryBuilder } from "eze-services";
import { AddProductService } from "./AddProductService";
import { Form, Grid } from "@/Containers";
import { IconInputController, PaginatorSelectorController, SelectorController, SelectorQuery } from "@/Elements";
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
          <IconInputController type="number" hive={formHive} id="cost_price" />
          <IconInputController type="number" hive={formHive} id="sale_price" />
          <IconInputController type="number" hive={formHive} id="category_id" />
          {/* <PaginatorSelectorController id={"category_id"} hive={formHive} paginator={Client.categoriesTag.CategoriesPaginator} queryKey="name" />
          <SelectorController
            hive={formHive}
            id="category_id"
            getOptions={async () => {
              const cats = await Client.categoriesTag.CategoriesPaginator.load();
              return cats.map((categoryResponse) => {
                return { value: categoryResponse.id, label: categoryResponse.name };
              });
            }}
          /> */}
          {/* <SelectorController hive={formHive} id="category_id" options={addProductService.categoriesHive.honey} /> */}
        </Grid>
      </Form>
    </FormWrapper>
  );
};

export default AddProductsPage;
