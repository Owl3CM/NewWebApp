import { MainRoutes, getMainRoutes } from "@/Routes";
import UnAuthRoutes from "./Routes/AuthRoutes";
import { Icon } from "./Assets";
import { ArrayBee, Bee, ObserverBee, Queryable } from "./Libs/eze-services";
import { cartItemsHive } from "./Pages/Cart/CartService";

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
          hive={cartItemsHive}
          Component={({ honey }) => {
            return (
              <div
                className="pointer"
                onClick={() => {
                  Queryable.navigate("/cart");
                }}>
                Cart ({honey.length})
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
