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
          ? `flex items-center gap-3 rounded-md px-4 py-2 transition-all
             ${
               isActive
                 ? "bg-yellow-400 text-[#0A2374]"
                 : "text-yellow-400 hover:bg-yellow-400 hover:text-[#0A2374]"
             }`
          : `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all
             ${
               isActive
                 ? "bg-yellow-400 text-[#0A2374]"
                 : "text-yellow-400 hover:bg-yellow-400 hover:text-[#0A2374]"
             }`
      }
    >
      {icon && <span className="h-5 w-5">{icon}</span>}
      {label && <span>{label}</span>}
    </NavLink>
  );
};
