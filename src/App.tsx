import { MainRoutes, getMainRoutes } from "@/Routes";
import UnAuthRoutes from "./Routes/AuthRoutes";
import { Icon } from "./Assets";
import { ArrayBee, Bee, ObserverBee, Queryable } from "./Libs/eze-services";
import CartService, { cartItemsHive } from "./Pages/Cart/CartService";
import { JsonBuilder } from "eze-utils";

function App() {
  const { routes, routesGroups } = getMainRoutes();

  return (
    <>
      <div className="bg-prim py-sm px-xl flex items-center justify-between">
        <Icon
          icon="home-outline"
          className="fill-prim text-owl"
          onClick={() => {
            Queryable.navigate("/");
          }}
        />
        <Bee
          hive={CartService.CartHive}
          Component={({ honey }) => {
            return (
              <div
                className="pointer"
                onClick={() => {
                  Queryable.navigate("/cart");
                }}>
                Cart ({honey.items.length})
              </div>
            );
          }}
        />
      </div>
      <div className="main">
        <MainRoutes routes={routes} />
      </div>
    </>
  );
}

export default App;
