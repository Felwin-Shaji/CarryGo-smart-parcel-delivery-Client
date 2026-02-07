import { useState } from "react";
import { Menu, X, Bell, Package, User, LogOut, Wallet } from "lucide-react";
// import { DropdownMenu } from "../../../components/globelcomponents/DropdownMenu";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useAuth } from "../../../Services/Auth";
import { useNavigate } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa6";
import { NavItem } from "./NavItem";
import { Dropdown, DropdownItem, DropdownSeparator } from "../../../components/globelcomponents/DropdownMenu";

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
    const LoginButton = () => (
        <button
            onClick={() => navigate("/login")}
            className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-[#0A2374]
               hover:bg-yellow-300 transition"
        >
            Login
        </button>
    );


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
                <nav className="hidden items-center space-x-2 md:flex">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.name}
                            to={item.href}
                            label={item.name}
                        />
                    ))}
                </nav>

                {/* Right-side icons */}
                <div className="hidden items-center space-x-6 md:flex">
                    {isLoggedIn && user ? (
                        <>
                            <Bell className="h-5 w-5 cursor-pointer text-yellow-400 hover:text-white" />

                            <NavItem
                                to="/bookings"
                                label=""
                                icon={<Package />}
                            />

                            <Dropdown
                                trigger={
                                    <div className="flex items-center gap-2 cursor-pointer text-yellow-400 hover:text-white">
                                        <User className="h-6 w-6" />
                                        <span className="font-semibold">{user.name}</span>
                                    </div>
                                }
                            >
                                <DropdownItem icon={<User />} label="Profile" to="/profile" />
                                <DropdownItem icon={<Wallet />} label="Wallet" to="/wallet" />
                                <DropdownItem icon={<FaAddressBook />} label="Manage Address" to="/addresses" />
                                <DropdownSeparator />
                                <DropdownItem
                                    icon={<LogOut />}
                                    label="Logout"
                                    danger
                                    onClick={() => handleLogoutt(user.role, user.id)}
                                />
                            </Dropdown>
                        </>
                    ) : (
                        <LoginButton />
                    )}
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
                        <NavItem
                            key={item.name}
                            to={item.href}
                            label={item.name}
                            mobile
                            onNavigate={() => setMenuOpen(false)}
                        />
                    ))}


                    <div className="mt-3 border-t border-yellow-400 pt-3 space-y-2">
                        {isLoggedIn && user ? (
                            <>
                                <NavItem to="/bookings" label="My Bookings" mobile onNavigate={() => setMenuOpen(false)} />
                                <NavItem to="/profile" label="Profile" mobile onNavigate={() => setMenuOpen(false)} />
                                <NavItem to="/wallet" label="Wallet" mobile onNavigate={() => setMenuOpen(false)} />
                                <NavItem to="/addresses" label="Manage Address" mobile onNavigate={() => setMenuOpen(false)} />

                                <button
                                    onClick={() => handleLogoutt(user.role, user.id)}
                                    className="w-full text-left px-4 py-2 rounded-md
                                    text-yellow-400 hover:bg-yellow-400/10"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavItem to="/login" label="Login" mobile />
                        )}
                    </div>

                </div>
            )}
        </header>
    );
};
