import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RedirectRoute from "./RedirectRoute";
import Loading from "@/Assets/stateKit/Loading";

const MainRoutes = ({ routes }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map(RouteBuilder)}
          <Route path={"/login"} element={<RedirectRoute />} />
          <Route path={"/register"} element={<RedirectRoute />} />
          <Route path={"*"} element={NotFound} />
        </Routes>
      </Suspense>
    </>
  );
};

const RouteBuilder = ({ path, Component }) => <Route key={path} path={path} element={<Component />} />;

export default MainRoutes;

const NotFound = (
  <div className="fixed inset-0 col-center" style={{ pointerEvents: "none" }}>
    <p className="mx-auto">Not Found</p>
  </div>
);
