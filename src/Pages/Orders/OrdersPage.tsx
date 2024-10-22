import { ArrayBee, Bee, Wrapper } from "eze-services";
import { OrdersService } from "./OrdersService";
import { Button } from "@/Elements";
import { JsonBuilder } from "eze-utils";

const OrdersPage = () => {
  const ordersService = OrdersService.Create();

  return (
    <Wrapper>
      <h1>Orders</h1>
      <ArrayBee hive={OrdersService.ordersHive} Component={({ honey }) => <JsonBuilder json={honey} />} />
      <Button label="addOrder" onClick={ordersService.addOrder}></Button>
    </Wrapper>
  );
};

export default OrdersPage;
