import { type ReactNode, useState } from "react";
import { Menu, ArrowLeftCircle, Bell, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useDashboard } from "../context/DashboardContext";

interface DashboardLayoutProps {
    children: ReactNode;
    pageTitle?: string;

}

export const DashboardLayout = ({
    children,
    pageTitle = "Dashboard",

}: DashboardLayoutProps) => {

    const { menuItems, handleLogout, userName } = useDashboard();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <motion.div
                animate={{ width: isSidebarOpen ? 240 : 80 }}
                className={`${isMobileMenuOpen ? "absolute z-40" : "hidden md:flex"}
          h-screen bg-[#0B1C44] text-gray-100 flex flex-col transition-all duration-300`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-000">

                    {isSidebarOpen &&

                        <img
                            src="\src\assets\CarryGoIcon.png"
                            alt="CarryGo Logo"
                            className="max-w-[60px] md:max-w-[60px] w-full object-contain"
                        />
                    }
                    <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
                        {isSidebarOpen ? <ArrowLeftCircle size={20} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Menu Items */}
                <div className="mt-3 flex-1 overflow-y-auto">
                    {menuItems.map((section, secIndex) => (
                        <div key={secIndex} className="px-3 mb-4">
                            {isSidebarOpen && (
                                <p className="text-xs text-gray-400 uppercase mb-2">{section.section}</p>
                            )}

                            {section.items.map((item, index) => {
                                const isActive = location.pathname === item.path;

                                return (
                                    <div
                                        key={index}
                                        onClick={() => navigate(item.path)}
                                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
                      ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`}
                                    >
                                        <div data-tooltip-id={`tooltip-${item.name}`}>
                                            {item.icon}
                                            {!isSidebarOpen && (
                                                <Tooltip id={`tooltip-${item.name}`} content={item.name} place="right" />
                                            )}
                                        </div>
                                        {isSidebarOpen && <span>{item.name}</span>}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    onClick={toggleMobileMenu}
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                />
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 h-screen bg-gray-50">
                {/* Header */}
                <header className="flex-shrink-0 flex justify-between items-center bg-[#0B1C44] text-white px-4 py-3 shadow-md sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        <button onClick={toggleMobileMenu} className="md:hidden text-gray-300 hover:text-white">
                            <Menu size={22} />
                        </button>
                        <h2 className="text-lg font-semibold">{pageTitle}</h2>
                    </div>

                    <div className="flex items-center gap-4">

                        <div className="flex items-center gap-2">
                            <span className="text-lg font-medium">{userName}</span>
                        </div>
                        <button className="relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-purple-500 rounded-full"></span>
                        </button>

                        <button onClick={handleLogout} className="hover:text-blue-400">
                            <LogOut size={22} />
                        </button>

                        <button
                            onClick={() => {
                                console.log("Logout button clicked!");
                                handleLogout();
                            }}
                            className="bg-red-500 text-white px-3 py-1"
                        >
                            LOGOUT TEST
                        </button>



                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
};
