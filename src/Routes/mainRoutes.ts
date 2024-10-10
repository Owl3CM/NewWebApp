import AddUser from "@/Pages/AddUser/AddUserPage";
import Users from "@/Pages/Users/UsersPage";
import { MainPage } from "@/Pages/mainPage";

export const getMainRoutes = () => {
  const GroupRoutes = [
    //
    { path: "/", Component: MainPage, label: "System" },
    { path: "/users", Component: Users, label: "Users" },
    { path: "/users/new", Component: AddUser, label: "Add User" },
  ];

  const groupByName = {};
  const routesObj = {};

  const routes = GroupRoutes as PagesRoutes[];
  routes.map(({ group, ...props }) => {
    if (typeof props.Component === "function") return;
    const foundedGroup = groupByName[props.path];
    if (foundedGroup) group = foundedGroup;
    if (group) {
      group.split("-").map((g) => {
        if (!routesObj[g]) routesObj[g] = [];
        routesObj[g].push(props);
      });
    }
  });

  const routesGroups = Object.keys(routesObj);

  return {
    routes,
    routesGroups: routesGroups.map((name) => ({ name, routes: routesObj[name] })).filter((o) => o.routes),
  };
};
