import Client from "@/Client";
import { createHive, createHiveArray } from "eze-services";

const id = 4;
class CartService {
  static loaded = false;
  static CartHive = createHive({
    id,
    items: [] as CartItemResponse[],
    items_quantity: 0,
    total_amount: 0,
    user_id: 1,
  });

  private static initPromise: Promise<void> | null = null;
  static init = async () => {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
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
      this.loaded = true;
    })();

    return this.initPromise;
  };

  static syncCart = async () => {
    CartService.CartHive.setHoney({ ...CartService.CartHive.honey });
  };

  static Create() {
    return new CartService();
  }
}

export default CartService;
