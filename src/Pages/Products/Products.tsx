import { Table, TableWrapper } from "@/Table";
import ProductsService from "./ProductsService";
import { Grid, QueryContainer } from "@/Containers";
import { ArrayBee, Wrapper } from "eze-services";
import { JsonBuilder } from "eze-utils";
import { Button } from "@/Elements";
import CartService from "../Cart/CartService";

const ProductsPage = () => {
  const service = ProductsService.Create();
  const cartService = CartService.Create();

  return (
    <Wrapper service={service}>
      <div className="my-2x">
        <QueryContainer service={service} />
      </div>
      <Grid>
        <ArrayBee
          hive={service.dataHive}
          Component={({ honey, i }) => {
            return (
              <SingleProduct
                product={honey}
                i={i}
                onClick={() => {
                  cartService.addToCart(honey);
                }}
              />
            );
          }}
        />
      </Grid>
    </Wrapper>
  );
};

const SingleProduct = ({ product, onClick }: { product: ProductResponse; i: number; onClick: () => void }) => {
  return (
    <div className="bg-king m-2x round-sm p-2x">
      <h2>{product.name}</h2>
      <p>{product.description || "No Description"}</p>
      <Button label="addToBasket" onClick={() => onClick()} />
    </div>
  );
};

export default ProductsPage;
