import { DashboardContext } from "./DashboardContext";
import { adminMenu } from "../config/adminMenu";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { ROLES } from "../types/roles";
import { useAuth } from "../Services/Logout";

interface DashboardProviderProps {
  children: ReactNode;
  role: "admin" | "agency" | "worker" | "hub";
}

export function DashboardProvider({ children, role }: DashboardProviderProps) {
  const { handleLogoutt } = useAuth();

  const admin = useSelector((state: any) => state.adminState.admin);

  const userName = admin?.name || "User";

  const roleMenus = {
    admin: adminMenu,
    agency: [],
    worker: [],
    hub: [],
  };

  const handleLogout = () => {
    if (role === ROLES.ADMIN && admin?.id) {
      handleLogoutt(ROLES.ADMIN, admin.id);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        menuItems: roleMenus[role],
        role,
        handleLogout,
        userName,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
