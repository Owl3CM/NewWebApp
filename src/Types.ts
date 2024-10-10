type Url = string;
type Interface = object;
type RouteGroup = "Auth" | "Admin" | "User" | "Public";

interface PagesRoutes {
  path: string;
  Component: any;
  label: string;
  group?: RouteGroup;
  type?: "bp" | "tp";
}

type TransactionType = "Debit" | "Credit" | "Neutral";
