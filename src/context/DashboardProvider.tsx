import { DashboardContext } from "./DashboardContext";
import { adminMenu, type MenuSection } from "../config/SidebarMenu/adminMenu";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../Services/Auth";
import type { RootState } from "../store/store";
import { agencyMenu } from "../config/SidebarMenu/agencyMenu";
import { ROLES, type Roles } from "../constants_Types/types/roles";
import { hunMenu } from "../config/SidebarMenu/hubMenu";


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
  if (role === ROLES.HUB) currentUser = useSelector((state: RootState) => state.hubState.hub);


  const userName = currentUser?.name || "User";


  let menuItems: MenuSection[];

  if (role === ROLES.ADMIN) {
    menuItems = adminMenu();
  } else if (role === ROLES.AGENCY) {
    const agencyUser = currentUser as { kycStatus?: string };
    menuItems = agencyMenu(agencyUser.kycStatus);
  } else if (role === ROLES.HUB) {
    const hubUser = currentUser as { kycStatus?: string };
    menuItems = hunMenu(hubUser.kycStatus);
  } else {
    menuItems = [];
  }


  const handleLogout = () => {
    if (currentUser?.id) {
      handleLogoutt(role, currentUser.id);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        menuItems,
        role,
        handleLogout,
        userName,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
