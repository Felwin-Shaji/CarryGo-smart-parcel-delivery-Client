// src/components/layout/Header.tsx
import { useState } from "react";
import { Menu, X, Bell, Package, User, LogOut, Settings, Wallet, LogIn } from "lucide-react";
import { DropdownMenu } from "../../../components/globelcomponents/DropdownMenu";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useAuth } from "../../../Services/Auth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isLoggedIn?: boolean;
}

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    const { handleLogoutt } = useAuth();
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(true);
    const { user } = useSelector((state: RootState) => state.userState)
    const homeItems = [
        { label: "Profile", icon: <User className="h-4 w-4" />, onClick: () => navigate("/profile")  },
        { label: "Wallet", icon: <Wallet className="h-4 w-4" />, onClick: () => console.log("Wallet") },
        { label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: () => console.log("Settings") },
        { label: "Logout", icon: <LogOut className="h-4 w-4" />, onClick: () => user && handleLogoutt(user.role, user.id), danger: true },
    ];

    const landingItems = [
        { label: "login", icon: <LogIn className="h-4 w-4" />, onClick: () => navigate("/login") },
    ]

    const menuItems = isLoggedIn?homeItems:landingItems

    return (
            <header className="fixed top-0 left-0 z-50 w-full bg-[#0A2374] text-white shadow-md">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">

                        <img
                            src="\src\assets\CarryGoIcon.png"
                            alt="CarryGo Logo"
                            className="max-w-[60px] md:max-w-[60px] w-full object-contain"
                        />
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden items-center space-x-6 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="rounded-lg px-4 py-2 font-medium text-yellow-400 transition-all duration-200 hover:bg-yellow-400 hover:text-[#0A2374]"
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Right-side icons */}
                <div className="hidden items-center space-x-6 md:flex">
                    <Bell className="h-5 w-5 cursor-pointer text-yellow-400 hover:text-white" />
                    <Package className="h-5 w-5 cursor-pointer text-yellow-400 hover:text-white" />
                    <div className="flex items-center space-x-2">
                        <DropdownMenu
                            trigger={
                                <div className="flex items-center gap-2 cursor-pointer text-yellow-400 hover:text-white">
                                    <User className="h-6 w-6" />
                                    <span className="font-semibold">{isLoggedIn? user?.name:"Login"}</span>
                                </div>
                            }
                            items={menuItems}
                            align="right"
                        />
                    </div>

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="rounded-md p-2 text-yellow-400 md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="space-y-2 bg-[#0A2374] px-4 pb-4 md:hidden">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md px-4 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-[#0A2374]"
                        >
                            {item.name}
                        </a>
                    ))}

                    <div className="mt-3 flex items-center space-x-3 border-t border-yellow-400 pt-3">
                        <Bell className="h-5 w-5 text-yellow-400" />
                        <Package className="h-5 w-5 text-yellow-400" />
                        <DropdownMenu
                            trigger={
                                <div className="flex items-center gap-2 cursor-pointer text-yellow-400 hover:text-white">
                                    <User className="h-6 w-6" />
                                    <span className="font-semibold">{user?.name}</span>
                                </div>
                            }
                            items={menuItems}
                            align="right"
                        />
                    </div>
                </div>
            )}
        </header>
    );
};
