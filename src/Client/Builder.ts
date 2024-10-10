import { ApiService, ClientBuilder } from "@/Libs/eze-link";

localStorage.setItem("access_token", "");
const Builder = new ClientBuilder({
  roots: {
    pos: "http://localhost:6969",
  },
  storeKey: "Crafter",
  api: ApiService.create({
    headers: {
      "Content-Type": "application/json",
    },
  }),
});
export default Builder;
