import Client from "@/Client";
import { TableService } from "@/Table";
import ProductsUtils from "./ProductsUtils";
import { Queryable } from "@/Libs/eze-services";
import { Toast } from "eze-utils";

export type IProductsService = typeof ProductsService;
export type FormattedProductsResponse = ProductResponse;

export default class ProductsService extends TableService<PaginatorProductsQueryParams, ProductResponse, FormattedProductsResponse> {
  id = "Products";

  constructor() {
    super({
      columns: ProductsUtils.tableColumns(),
      paginator: Client.productsTag.ProductsPaginator,
      formatResponse: ProductsUtils.formatResponse,
    });

    ProductsService.RemoveProduct = async (id) => {
      await Client.productsTag.DeleteProduct({ id });
      this.dataHive.removeById(id);
      Toast.success({ title: "Product Deleted" });
    };

    Queryable.Reset({ service: this });
  }

  filters = [{ id: "name", type: "string", placement: "InLine" }];

  static RemoveProduct = async (id: number) => {
    await Client.productsTag.DeleteProduct({ id });
    Toast.success({ title: "Product Deleted" });
  };

  static Create = () => new ProductsService();
}
