import Client from "@/Client";
import { Queryable } from "@/Libs/eze-services";
import { TableService } from "@/Table";
import { Toast } from "eze-utils";
import CartService from "../Cart/CartService";
import ProductsUtils from "./ProductsUtils";

export type IProductsService = typeof ProductsService;
export type FormattedProductsResponse = {
  item?: CartItemResponse;
} & ProductResponse;

export default class ProductsService extends TableService<PaginatorProductsQueryParams, ProductResponse, FormattedProductsResponse> {
  id = "Products";

  constructor() {
    super({
      columns: ProductsUtils.tableColumns(),
      paginator: Client.productsTag.ProductsPaginator,
      async onResponse({ data, clear, hasMore }) {
        data = await ProductsUtils.formatResponse(data);

        if (clear) this.dataHive.setHoney(data as any[]);
        else this.dataHive.append(data as any[]);
        setTimeout(() => {
          this.canLoadHive.setHoney(hasMore);
        }, 100);

        this.statusHive.setHoney("idle");
      },
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

  async removeFromCart(itemId: number) {
    await Client.cartsItemsTag.DeleteCartsItem({
      id: itemId,
    });

    CartService.CartHive.setHoney((cart) => {
      cart.items = cart.items.filter((item) => item.id !== itemId);
      cart.items_quantity = cart.items.length;
      return cart;
    });
    CartService.syncCart();
    this.reload();
  }

  async addToCart(product) {
    const item = await Client.cartsItemsTag.AddCartsItem({
      body: {
        cart_id: CartService.CartHive.honey.id,
        product_id: product.id,
        name: product.name,
        cost_price: product.cost_price,
        description: product.description,
        quantity: 1,
        sale_price: product.sale_price,
        images: product.images,
        product,
      },
    });

    CartService.CartHive.setHoney((cart) => {
      cart.items.push(item);
      cart.items_quantity = cart.items.length;
      return cart;
    });

    CartService.syncCart();
    this.reload();
  }
}
