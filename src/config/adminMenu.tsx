import {
  Home,
  User,
  Wallet,
  Shield,
  Building2,
} from "lucide-react";
import type { JSX } from "react";

export interface MenuItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export const adminMenu: MenuSection[] = [
  {
    section: "General",
    items: [
      { name: "Dashboard", icon: <Home size={20} />, path: "/admin" },
      { name: "Profile", icon: <User size={20} />, path: "/admin/profile" },
      { name: "Wallet", icon: <Wallet size={20} />, path: "/admin/wallet" },
    ],
  },
  {
    section: "Users",
    items: [
      { name: "Users List", icon: <User size={20} />, path: "/admin/users" },
      { name: "KYC Verification", icon: <Shield size={20} />, path: "/admin/kyc" },
    ],
  },
  {
    section: "Agency",
    items: [
      { name: "Agency List", icon: <Building2 size={20} />, path: "/admin/agency" },
      { name: "Agency Verification", icon: <Shield size={20} />, path: "/admin/agency-verification" },
    ],
  },
];
