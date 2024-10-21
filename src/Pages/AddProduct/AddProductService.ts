import { createFormHive, createHive, IHive, Status } from "eze-services";
import { IAddProductFormHive } from "./AddProductUtils";
import Client from "@/Client";
import { IListOption } from "@/Elements/Selectors/kit";
import { CraftNestFromKeys } from "@/Forms";
import { Toast } from "eze-utils";

export class AddProductService {
  statusHive: IHive<Status>;
  formHive: IAddProductFormHive;
  categoriesHive: IHive<IListOption[]>;

  constructor() {
    this.statusHive = createHive("idle");
    this.categoriesHive = createHive([]);

    this.formHive = createFormHive({
      initialValue: {
        category_id: null,
        cost_price: 0,
        description: "",
        image: "",
        name: "",
        sale_price: 0,
      },
      onSubmit: async (values) => {
        try {
          this.statusHive.setHoney("processing");
          const body = CraftNestFromKeys(values) as any;
          await Client.productsTag.AddProduct({ body });
          this.statusHive.setHoney("idle");
          Toast.success({ title: "success" });
          this.formHive.reset();
        } catch (err) {
          this.statusHive.setHoney("idle");
          Toast.error({ title: "error" });
        }
      },
    });

    this.FetchCategories().then((categories) => {
      this.categoriesHive.setHoney(categories);
    });
  }

  async FetchCategories(): Promise<IListOption[]> {
    const data = await Client.categoriesTag.CategoriesPaginator.load();
    return data.map((categoryResponse) => {
      return { value: categoryResponse.id, label: categoryResponse.name };
    });
  }
  static Create = () => new AddProductService();
}
