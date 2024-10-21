import { ArrayBee, Bee, Wrapper } from "eze-services";
import CartService, { cartItemsHive } from "./CartService";
import { Button } from "@/Elements";
import { Grid } from "@/Containers";

const CartPage = () => {
  const cartService = CartService.Create();

  return (
    <Wrapper>
      <h1 className="text-center">Cart Page</h1>
      <Grid>
        <ArrayBee
          hive={cartItemsHive}
          Component={({ honey, i }) => {
            <div>{JSON.stringify(i)}</div>;
          }}
        />
      </Grid>
    </Wrapper>
  );
};

export default CartPage;
