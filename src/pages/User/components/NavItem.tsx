import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  mobile?: boolean;
  onNavigate?: () => void;
}

export const NavItem = ({
  to,
  label,
  icon,
  mobile = false,
  onNavigate,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        mobile
          ? `flex items-center gap-3 px-4 py-2 rounded-md transition-all
             ${
               isActive
                 ? "text-yellow-400"
                 : "text-gray-300 hover:text-white"
             }`
          : `relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all
             ${
               isActive
                 ? "text-yellow-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-yellow-400"
                 : "text-gray-300 hover:text-white"
             }`
      }
    >
      {icon && <span className="h-5 w-5">{icon}</span>}
      {label && <span>{label}</span>}
    </NavLink>
  );
};
