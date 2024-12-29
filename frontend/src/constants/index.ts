import { DollarSign, Home, Layout, ShoppingBag, User } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Inventory",
    icon: Layout,
    href: "/inventory",
  },
  {
    label: "Products",
    icon: ShoppingBag,
    href: "/products",
  },
  {
    label: "Users",
    icon: User,
    href: "/users",
  },
  {
    label: "Expenses",
    icon: DollarSign,
    href: "/expenses",
  },
];
