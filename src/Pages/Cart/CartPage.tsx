import { ArrayBee, Bee, Wrapper } from "eze-services";
import CartService from "./CartService";
import { Button } from "@/Elements";
import { Grid } from "@/Containers";
import { JsonBuilder } from "eze-utils";

const CartPage = () => {
  const cartService = CartService.Create();

  return (
    <Wrapper>
      <h1 className="text-center">Cart Page</h1>
      <Grid>
        <Bee hive={CartService.CartHive} Component={({ honey }) => <JsonBuilder json={honey.items} />} />
      </Grid>
    </Wrapper>
  );
};

export default CartPage;
