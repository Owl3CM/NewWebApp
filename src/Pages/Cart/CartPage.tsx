import { ArrayBee, Bee, ObserverBee, Wrapper } from "eze-services";
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
        <ObserverBee
          hive={CartService.CartHive}
          Component={({ honey }) => {
            return honey.items.length === 0 ? (
              <div>No items in the cart</div>
            ) : (
              honey.items
                .reduce((acc, item) => {
                  const found = acc.find((accItem) => accItem.product.product_id === item.product_id);
                  if (found) {
                    found.quantity += 1;
                  } else {
                    acc.push({ product: item, quantity: 1 });
                  }
                  return acc;
                }, [])
                .map((item, i) => <Item key={i} index={i} item={item} />)
            );
          }}
        />
      </Grid>
    </Wrapper>
  );
};

const Item = ({ item, index }) => {
  return (
    <div className="bg-king p-2x">
      <h2>
        {index + 1}-{item.product.name}
      </h2>
      <p>{item.product.sale_price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default CartPage;
