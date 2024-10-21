import { Grid, Wrapper } from "@/Containers";
import { IconLink } from "@/Elements";

const mainPage = () => {
  return (
    <Wrapper className="col p-lg gap-xl h-screen overflow-auto">
      <Grid size="sm">
        <IconLink label="users" to="/users" icon="user-colored" />
        <IconLink label="addUser" to="/users/new" icon="user-plus-colored" />
        <IconLink label="categories" to="/categories/new" icon="list-colored" />
      </Grid>
    </Wrapper>
  );
};

export default mainPage;
