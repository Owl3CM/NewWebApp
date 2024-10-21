import { Service, Status, createFormHive, createHive } from "eze-services";
import { categoryStatus } from "./CagegoryStatusKit";

export default class AddCategoryService extends Service {
  statusHive = createHive<Status>("idle");
  statusKit = categoryStatus;

  formHive = createFormHive({
    initialValue: {
      name: "",
      description: {
        image: "",
      },
      image: [],
      images: [],
      money: {
        price: 0,
        currency: "usd",
      },
    },
    validator: (key, value) => {
      return Valid[key]?.(value);
    },
    onSubmit: async (values) => {
      this.statusHive.setHoney("processing");
      console.log("AddCategoryService onSubmit", values);
    },
  });
  constructor(props) {
    super({});
  }
}

const Valid = {
  name: (value) => {},
  images: (value: string[]) => {
    if (!value.length) return "you must add at least one image";
    for (let image of value) {
      if (!image.startsWith("http")) {
        return "image must be a valid url";
      }
    }
  },
};
