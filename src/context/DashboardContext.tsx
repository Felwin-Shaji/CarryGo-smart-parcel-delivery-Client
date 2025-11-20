import { createContext, useContext } from "react";
import type { MenuSection } from "../config/SidebarMenu/adminMenu";

export interface DashboardContextType {
    menuItems:MenuSection[];
    role:string,
    handleLogout: () => void;
    userName:string
};


export const DashboardContext = createContext<DashboardContextType | null>(null)

export const useDashboard = ()=>{
    const ctx = useContext(DashboardContext);
    if (!ctx) throw new Error("DashboardContext must be used within Provider");
    return ctx;
};