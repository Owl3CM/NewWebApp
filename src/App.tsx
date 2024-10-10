import { MainRoutes, getMainRoutes } from "@/Routes";
import UnAuthRoutes from "./Routes/AuthRoutes";
import { Icon } from "./Assets";
import { Queryable } from "./Libs/eze-services";

function App() {
  const { routes, routesGroups } = getMainRoutes();

  return (
    <>
      <div className="bg-prim py-sm px-xl">
        <Icon
          icon="home-outline"
          className="fill-prim text-owl"
          onClick={() => {
            Queryable.navigate("/");
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
