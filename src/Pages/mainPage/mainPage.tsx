import { Grid, Wrapper } from "@/Containers";
import { IconLink } from "@/Elements";

const mainPage = () => {
  return (
    <Wrapper className="col p-lg gap-xl h-screen overflow-auto">
      <Grid size="sm">
        <IconLink label="users" to="/users" icon="user-colored" />
        <IconLink label="addUser" to="/users/new" icon="user-plus-colored" />
        <IconLink label="addCategory" to="/categories/new" icon="category-outline" />
        <IconLink label="categories" to="/categories" icon="category-outline" />
        <IconLink label="addProducts" to="/products/new" icon="category-outline" />
        <IconLink label="products table" to="/products/table" icon="category-outline" />
        <IconLink label="products" to="/products" icon="category-outline" />
        <IconLink label="Orders" to="/orders" icon="category-outline" />
      </Grid>
    </Wrapper>
  );
};

export default mainPage;
