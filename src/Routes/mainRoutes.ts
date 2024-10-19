import AddCategory from "@/Pages/AddCategory/AddCategoryPage";
import AddProductsPage from "@/Pages/AddProduct/AddProductPage";
import AddUser from "@/Pages/AddUser/AddUserPage";
import Categories from "@/Pages/Categories/CategoriesPage";
import Users from "@/Pages/Users/UsersPage";
import { MainPage } from "@/Pages/mainPage";

export const getMainRoutes = () => {
  const GroupRoutes = [
    //
    { path: "/", Component: MainPage, label: "System" },
    { path: "/users", Component: Users, label: "Users" },
    { path: "/users/new", Component: AddUser, label: "Add User" },
    {
      path: "/categories/new",
      Component: AddCategory,
      label: "Add Category",
    },
    {
      path: "/categories",
      Component: Categories,
      label: "Categories",
    },
    {
      path: "/products/new",
      Component: AddProductsPage,
      label: "Add Product",
    },
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
