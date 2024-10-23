import { BaseInput, IconInput, IconInputController, IconInputLabel, Input, InputLabel, SelectorController } from "@/Elements";
import { createFormHive, IFormHiveValidator } from "@/Libs/eze-services";
import Vee, { VeeIt, MyVee } from "./Validator";
import { ControllerContainer } from "eze-services";
import { GetLabel } from "@/Language";
import PhoneNumberController from "@/Components/PhoneNumber";

type Props = {};

const err = undefined;

const formHive = createFormHive({
  initialValue: {
    name: "",
    custom: "",
    phone: "",
    test: {
      age: 0,
    },
  },
  onSubmit: (values) => {
    console.log(values);
  },
  // validator: getValidator(),
  // validator: (key, value) => {
  //   if (key === "name") {
  //     if (value.length < 3) {
  //       return "Name must be at least 3 characters";
  //     }
  //   }
  // },
  // validateMode: "onChange",
  validateMode: "onBlur",
  getValidator: (formHive) => {
    const ageValidator = MyVee.Create("age")
      .number()
      .custom((value) => {
        if (value < 10) return "Age must be at least 10";
      })
      .gt(18)
      .build();

    const customValidator = MyVee.Create("custom").required().customCheck().min(5).max(10).build();
    const nameValidator = MyVee.Create("name").required().min(3, "ميصير اقل من {value}").max(10).build();
    return {
      phone: MyVee.Create("phone").required().phone("رقم الهاتف غير صالح ").build(),
      name: (value) => {
        const nameErro = nameValidator(value);
        console.log(formHive.getError("custom"));
        if (formHive.getError("custom") === nameErro) formHive.setError("custom", nameErro);
        return nameErro;
      },
      custom: (value) => {
        return nameValidator(formHive.honey.name) || customValidator(value);
      },
      test: (value) => {
        return ageValidator(value.age);
      },
    };
  },
});

// interface IValidator<T, K extends keyof T> {
//   [key: K]: (value: T[K]) => string | undefined;
// }
// interface IValidator<T> {
//   [K in keyof T]?: (value: T[K]) => string | undefined;
// }

// fix the interface
// interface IValidator<T, K extends keyof T> {
//   [key: K]: (value: T[K]) => string | undefined;
// }

// const Validator: IValidator<typeof formHive.honey> = {
//   name:(
//     value // the value take the type of the key in this case is string
//      )=>{
//     // and it's retun  a string
//   }

// };

const TestOne = (props: Props) => {
  return (
    <div className="col gap-xl ">
      <div className="bg-king p-lg">
        <BaseInput id="red" error={err} />
      </div>
      <div className="bg-king p-lg">
        <Input id="red" error={err} />
      </div>
      <div className="bg-king p-lg">
        <InputLabel id="red" error={err} />
      </div>
      <div className="bg-king p-lg">
        <IconInput id="red" error={err} />
      </div>
      <div className="bg-king p-lg">
        <IconInputLabel id="red" error={err} />
      </div>
      <div className="bg-king p-lg">
        <SelectorController
          hive={formHive}
          id="name"
          options={[
            { label: "One", value: "1" },
            { label: "Two", value: "nice" },
            { label: "Three", value: 3 },
          ]}
        />
      </div>
      <div className="bg-king p-lg">
        <IconInputController hive={formHive} id="name" />
      </div>
      <div className="bg-king p-lg">
        <IconInputController hive={formHive} id="custom" />
      </div>
      <div className="bg-king p-lg">
        <PhoneNumberController hive={formHive} id="phone" />
      </div>
      {/* <div className="bg-king p-lg">
        <IconInputController hive={formHive} id="phone" />
      </div> */}
      <ControllerContainer
        formHive={formHive}
        id="test"
        Element={({ value, setValue, error }) => {
          return (
            <>
              <IconInput
                type="number"
                id="age"
                error={error}
                setValue={(v) => {
                  value.age = v;
                  setValue(value);
                }}
                value={value.age}
              />
            </>
          );
        }}
      />
      <h1>TestOne</h1>
    </div>
  );
};

export default TestOne;
