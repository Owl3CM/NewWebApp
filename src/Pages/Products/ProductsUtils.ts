import { CellBuilder, TableColumnDef } from "@/Table";
import ProductsService, { FormattedProductsResponse } from "./ProductsService";
import { CellBtnBuilder } from "./ProductsTable";
import Client from "@/Client";
import { Toast } from "eze-utils";

const ProductsUtils = {
  formatResponse(data: ProductResponse[]) {
    return data as any as FormattedProductsResponse[];
  },
  tableColumns() {
    const headers: TableColumnDef<FormattedProductsResponse>[] = [
      { id: "name", cell: (item) => CellBuilder(item.name) },
      { id: "sale_price", cell: (item) => CellBuilder(item.sale_price) },
      { id: "cost_price", cell: (item) => CellBuilder(item.cost_price) },
      {
        id: "remove_action",
        cell: (item) =>
          CellBtnBuilder("Remove", async () => {
            ProductsService.RemoveProduct(item.id);
          }),
      },
      // { id: "category.name", cell: (item) => CellBuilder(item.category.name) },
    ];

    return headers.filter((tc) => tc !== null);
  },
};

export default ProductsUtils;
