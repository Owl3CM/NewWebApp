import Glob from "@/Glob";
import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoute = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(Glob.User ? "/" : "/login");
  }, [navigate]);
  return <></>;
};

export default RedirectRoute;
