import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RedirectRoute from "./RedirectRoute";

const UnAuthRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route
          path="/login"
          element={
            <div>
              <h1>Login</h1>
            </div>
          }
        />
        <Route path="*" element={<RedirectRoute />} />
      </Routes>
    </Suspense>
  );
};

export default UnAuthRoutes;
