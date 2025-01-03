import { DollarSign, Home, Layout, ShoppingBag, User } from "lucide-react";
import { Users, ShoppingCart, TrendingUp } from "lucide-react";


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

export const statCardsData = [
  {
    title: "Total Users",
    value: "10,482",
    description: "+20.1% from last month",
    icon: Users,
  },
  {
    title: "Sales",
    value: "$45,231.89",
    description: "+15% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$67,893.12",
    description: "+18.7% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Now",
    value: "573",
    description: "+201 since last hour",
    icon: TrendingUp,
  },
];

export const PieColorsLight = ["#71717a", "#52525b", "#3f3f46"];

export const PieColorsDark = ["#a1a1aa", "#c4c4cc", "#e4e4e7"];
