import {
  Home,
  User,
  Wallet,
  Building2,
  MapPin,
} from "lucide-react";

import type { MenuSection } from "./adminMenu";

export const agencyMenu: MenuSection[] = [
  {
    section: "Overview",
    items: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/agency/dashboard" },
      { name: "Profile", icon: <User size={20} />, path: "/agency/profile" },
      { name: "Wallet", icon: <Wallet size={20} />, path: "/agency/wallet" },
    ],
  },

  {
    section: "Hub Management",
    items: [
      { name: "All Hubs", icon: <Building2 size={20} />, path: "/agency/hubs" },
      { name: "Add Hub", icon: <MapPin size={20} />, path: "/agency/hubs/add" },
    ],
  },

];
