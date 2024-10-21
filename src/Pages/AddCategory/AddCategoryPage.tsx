import { FormWrapper } from "@/Forms";
import React from "react";
import AddCategoryService from "./AddCategoryService";
import { Form, Grid } from "@/Containers";
import { Bee, ControllerContainer, FormBee, StatusBee, setDefaultStatusKit } from "eze-services";
import { Queryable } from "@/Libs/eze-services";
import { InputWithSelectorController } from "@/Elements";

type Props = {};

function AddCategoryPage({}: Props) {
  const addCategoryService = new AddCategoryService();

  return (
    <FormWrapper service={addCategoryService}>
      <input
        onChange={(e) => {
          Queryable.updateQueryParams({ id: "id", value: e.target.value });
        }}
      />
      <Form formHive={addCategoryService.formHive}>
        <Grid className="">
          <InputWithSelectorController
            hive={addCategoryService.formHive}
            id="money"
            inputKey="price"
            selectorKey="currency"
            options={[
              { label: "USD", value: "usd" },
              { label: "EGP", value: "egp" },
            ]}
          />
          <FormBee
            hive={addCategoryService.formHive.getNestedHive("name")}
            Component={({ honey, setHoney }) => {
              return <input className="bg-king" value={honey} onChange={(e) => setHoney(e.target.value)} />;
            }}
          />
          <TextController formHive={addCategoryService.formHive} id="name" />
          <ControllerContainer
            id={"images"}
            formHive={addCategoryService.formHive}
            Element={({ setValue, value, error }) => {
              return (
                <div className="grid" data-form-error={error}>
                  {value.map((image, index) => {
                    // return <img key={index} src={image} alt="image" />;
                    return (
                      <input
                        className="bg-king p-lg round-md"
                        key={index}
                        value={image}
                        onChange={(e) => {
                          value[index] = e.target.value;
                          setValue(value);
                        }}
                      />
                    );
                  })}
                  <p
                    onClick={() => {
                      setValue([...value, ""]);
                    }}>
                    add
                  </p>
                </div>
              );
            }}
          />
        </Grid>
      </Form>
    </FormWrapper>
  );
}

export default AddCategoryPage;

const TextController = ({ formHive, id, variant = "default" }) => {
  return (
    <ControllerContainer
      id={id}
      formHive={formHive}
      Element={({ setValue, value, error }) => {
        return <input className="bg-king" value={value} onChange={(e) => setValue(e.target.value)} />;
      }}
    />
  );
};
