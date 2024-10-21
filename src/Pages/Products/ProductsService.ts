import Client from "@/Client";
import { TableService } from "@/Table";
import ProductsUtils from "./ProductsUtils";
import { Queryable } from "@/Libs/eze-services";

export type IProductsService = {};
export type FormattedProductsResponse = ProductResponse;

export default class ProductsService extends TableService<PaginatorProductsQueryParams, ProductResponse, FormattedProductsResponse> {
  id = "Products";

  constructor() {
    super({
      columns: ProductsUtils.tableColumns(),
      paginator: Client.productsTag.ProductsPaginator,
      formatResponse: ProductsUtils.formatResponse,
    });

    Queryable.Reset({ service: this });
  }

  filters = [{ id: "name", type: "string", placement: "InLine" }];

  static Create = () => new ProductsService();
}
