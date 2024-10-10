import "./index.css";
import App from "@/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SparkContainer } from "@/Libs/eze-spark";
import QueryableSubscribe from "./Routes/QueryableSubscribe";
import { AppInit } from "./Utils/AppInit";

AppInit();
createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryableSubscribe />
    <App />
    <SparkContainer childClass="app-popup" animationTime={300} />
  </BrowserRouter>
);
