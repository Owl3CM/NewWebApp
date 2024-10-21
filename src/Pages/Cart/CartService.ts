import Client from "@/Client";
import { createHive, createHiveArray } from "eze-services";

export const cartItemsHive = createHiveArray([], "cart-items");
export const cartIdHive = createHive<string | null>(localStorage.getItem("cartId"), "cart-id");

const id = 1;
class CartService {
  static CartHive = createHive({
    items: [],
    items_quantity: 0,
    total_amount: 0,
    user_id: 1,
  });

  static init = async () => {
    let cart = await Client.cartsTag.CartById({ id });
    if (!cart) {
      cart = await Client.cartsTag.AddCart({
        body: {
          items: [],
          items_quantity: 0,
          total_amount: 0,
          user_id: 1,
        },
      });
    }

    this.CartHive.setHoney(cart);
  };
  public async addToCart(product) {
    const cart = CartService.CartHive.honey;
    await Client.cartsItemsTag.AddCartsItem({ body: { cart_id: cart.id, product_id: product.id } });
    cart.items.push(product);
    cart.items_quantity = cart.items.length;
    this.syncCart();
  }

  public syncCart = async () => {
    CartService.CartHive.setHoney({ ...CartService.CartHive.honey });
  };

  static Create() {
    return new CartService();
  }
}

export default CartService;
