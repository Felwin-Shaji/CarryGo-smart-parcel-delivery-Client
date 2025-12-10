import {
  Home,
  User,
  Wallet,
  Users,
  UserPlus,
} from "lucide-react";

import type { MenuSection } from "./adminMenu";

export const hunMenu= (kycStatus?: string): MenuSection[] =>  [
  {
    section: "Overview",
    items: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/hub/dashboard" },
      { name: "Profile", icon: <User size={20} />, path: "/hub/profile" },
      { name: "Wallet", icon: <Wallet size={20} />, path: "/hub/wallet" },
    ],
  },

  {
    section: "Workers",
    items: [
      { name: "Worker List", icon: <Users size={20} />, path: "/hub/workers" ,disabled: kycStatus !== "APPROVED",},
      { name: "Add Worker", icon: <UserPlus size={20} />, path: "/hub/workers/add",disabled: kycStatus !== "APPROVED", },
    ],
  },
];
