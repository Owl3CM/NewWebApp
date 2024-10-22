import { CellBuilder, TableColumnDef } from "@/Table";
import ProductsService, { FormattedProductsResponse } from "./ProductsService";
import { CellBtnBuilder } from "./ProductsTable";
import Client from "@/Client";
import { Toast } from "eze-utils";
import CartService from "../Cart/CartService";

const ProductsUtils = {
  async formatResponse(data: FormattedProductsResponse[]) {
    await CartService.init();

    const cartItems = CartService.CartHive.honey.items;

    cartItems.forEach((item) => {
      const product = data.find((product) => item.product_id === product.id);
      if (product) {
        product.item = item;
      }
    });

    return data;
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
    ];

    return headers.filter((tc) => tc !== null);
  },
};

export default ProductsUtils;
