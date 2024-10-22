import { Table, TableWrapper } from "@/Table";
import ProductsService, { FormattedProductsResponse } from "./ProductsService";
import { Grid, QueryContainer } from "@/Containers";
import { ArrayBee, Wrapper } from "eze-services";
import { JsonBuilder } from "eze-utils";
import { Button } from "@/Elements";
import CartService from "../Cart/CartService";

const ProductsPage = () => {
  const service = ProductsService.Create();

  return (
    <Wrapper service={service}>
      <div className="my-2x">
        <QueryContainer service={service} />
      </div>
      <Grid>
        <ArrayBee
          hive={service.dataHive}
          Component={({ honey, i }) => {
            return <SingleProduct product={honey} service={service} />;
          }}
        />
      </Grid>
    </Wrapper>
  );
};

const SingleProduct = ({ product, service }: { product: FormattedProductsResponse; service: ProductsService }) => {
  return (
    <div className="bg-king m-2x round-sm p-2x">
      <h2>{product.name}</h2>
      <p>{product.description || "No Description"}</p>
      <Button label="addToBasket" onClick={() => service.addToCart(product)} />
      {product.item && (
        <Button
          variant="danger"
          label="removeFromBasket"
          onClick={() => {
            service.removeFromCart(product.item.id);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
