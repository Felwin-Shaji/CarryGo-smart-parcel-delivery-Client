import { DashboardContext } from "./DashboardContext";
import { adminMenu } from "../config/SidebarMenu/adminMenu";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../Services/Auth";
import type { RootState } from "../store/store";
import { agencyMenu } from "../config/SidebarMenu/agencyMenu";
import { ROLES, type Roles } from "../constants_Types/types/roles";


type DashboardRoles = Exclude<Roles, "user">;


interface DashboardProviderProps {
  children: ReactNode;
  role: DashboardRoles;
}

export function DashboardProvider({ children, role }: DashboardProviderProps) {
  const { handleLogoutt } = useAuth();
  let currentUser = null;
  if (role === ROLES.ADMIN) currentUser = useSelector((state: RootState) => state.adminState.admin);
  if (role === ROLES.AGENCY) currentUser = useSelector((state: RootState) => state.agencyState.agency);


  const userName = currentUser?.name || "User";

  const roleMenus = {
    admin: adminMenu,
    agency: agencyMenu,
    worker: [],
    hub: [],
  };

  const handleLogout = () => {
    if (currentUser?.id) {
      handleLogoutt(role, currentUser.id);
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
