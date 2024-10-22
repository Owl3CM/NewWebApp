import { createHiveArray } from "eze-services";
import CartService from "../Cart/CartService";
import Client from "@/Client";

export class OrdersService {
  static ordersHive = createHiveArray<{ id: number; cart: any }>([]);

  public addOrder() {
    const cart = CartService.CartHive.honey;
    CartService.CartHive.setHoney({ items: [], items_quantity: 0, total_amount: 0, user_id: null });
    OrdersService.ordersHive.setHoney([...OrdersService.ordersHive.honey, { id: OrdersService.ordersHive.honey.length + 1, cart }]);
  }

  static Create = () => new OrdersService();
}
