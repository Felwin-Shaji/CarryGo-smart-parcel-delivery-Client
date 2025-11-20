import {
  Home,
  User,
  Wallet,
  Building2,
  Users,
  UserPlus,
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

  {
    section: "Workers",
    items: [
      { name: "Worker List", icon: <Users size={20} />, path: "/agency/workers" },
      { name: "Add Worker", icon: <UserPlus size={20} />, path: "/agency/workers/add" },
    ],
  },
];
