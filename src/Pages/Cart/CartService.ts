import { createHive, createHiveArray } from "eze-services";

export const cartItemsHive = createHiveArray([], "cart-items");
export const cartIdHive = createHive<string | null>(localStorage.getItem("cartId"), "cart-id");

class CartService {
  public addToCart(id: number) {
    cartItemsHive.setHoney((prev) => [...prev, { id: Math.random() }]);
  }

  static Create() {
    return new CartService();
  }
}

export default CartService;
