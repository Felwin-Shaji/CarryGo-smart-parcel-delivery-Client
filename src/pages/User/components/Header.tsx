import { useState } from "react";
import { Menu, X, Bell, Package, User, LogOut, Wallet, Car, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useAuth } from "../../../Services/Auth";
import { useNavigate } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa6";
import { NavItem } from "./NavItem";
import { Dropdown, DropdownItem, DropdownSeparator } from "../../../shared/components/globelcomponents/DropdownMenu";
import Logo from "../../../assets/CarryGo-Transparent-icon.png";
import { useNotificationsState } from "../../../Services/Notification/useNotificationsState";
import NotificationModal from "../../../shared/components/globelcomponents/NotificationModal";
import type { Roles } from "../../../shared/constants_Types/types/roles";


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

  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.userState)
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    hasMore,
    loadMoreNotifications,
    loading
  } = useNotificationsState(user?.role as Roles);

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">


        {/* Logo */}
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => navigate("/home")}
        >
          <img
            src={Logo}
            alt="CarryGo Logo"
            className="h-10 w-auto"
          />

          <span className="text-lg font-semibold tracking-tight">
            CarryGo
          </span>
        </div>


        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">

          {navItems.map((item) => (
            <NavItem
              key={item.name}
              to={item.href}
              label={item.name}
            />
          ))}
        </nav>
        {/* Right Section */}
        <div className="hidden items-center gap-5 md:flex">

          {isLoggedIn && user ? (
            <>
              <NavItem
                to="/traveler"
                label="Travel"
                icon={<Car className="h-5 w-5" />}
              />

              <NavItem
                to="/bookings"
                label="Bookings"
                icon={<Package className="h-5 w-5" />}
              />

              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative flex items-center justify-center
                    rounded-full
                    text-white
                    transition-all duration-200
                    hover:bg-white/10 hover:text-white"
                >
                  <Bell className="h-5 w-5" />

                  {unreadCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[20px] h-[20px]
                        flex items-center justify-center
                        text-[11px] font-bold
                        bg-red-500 text-white
                        rounded-full shadow-md"
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                <NotificationModal
                  isOpen={isOpen}
                  notifications={notifications}
                  loading={loading}
                  hasMore={hasMore}
                  loadMoreNotifications={loadMoreNotifications}
                  onClose={() => setIsOpen(false)}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </div>


              <Dropdown
                trigger={
                  <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg
             cursor-pointer transition-all duration-200
             hover:bg-white/5 group"
                  >
                    {/* Avatar */}
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full
               bg-yellow-400 text-[#0A2374] font-semibold text-sm
               transition-transform duration-200 group-hover:scale-105"
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <span className="text-sm font-medium text-white/90 transition-colors duration-200 group-hover:text-white">
                      {user.name}
                    </span>

                    {/* Chevron */}
                    <ChevronDown
                      className="h-4 w-4 text-white/50 transition-transform duration-200 group-hover:rotate-180 group-hover:text-white/80"
                    />
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
          className="md:hidden p-2 text-white hover:text-yellow-400 transition"

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
