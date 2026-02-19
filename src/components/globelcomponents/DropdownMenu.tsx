import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: "left" | "right";
    width?: string;
}

export const Dropdown = ({
  trigger,
  children,
  align = "right",
  width = "w-56",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute z-50 mt-3 ${width} rounded-xl
          bg-[#0A2374] shadow-2xl ring-1 ring-white/10
          backdrop-blur-sm
          ${align === "right" ? "right-0" : "left-0"}`}
        >
          <div className="py-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};





interface DropdownItemProps {
    label: string;
    icon?: ReactNode;
    to?: string;
    onClick?: () => void;
    danger?: boolean;
}

export const DropdownItem = ({
    label,
    icon,
    to,
    onClick,
    danger,
}: DropdownItemProps) => {
    const base =
        "flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150";


    const style = danger
        ? "text-yellow-400 hover:bg-yellow-400/10"
        : "text-white/90 hover:bg-white/10 hover:text-white";




    if (to) {
        return (
            <NavLink to={to} className={`${base} ${style}`}>
                {icon && <span className="h-4 w-4">{icon}</span>}
                {label}
            </NavLink>
        );
    }

    return (
        <button onClick={onClick} className={`${base} ${style}`}>
            {icon && <span className="h-4 w-4">{icon}</span>}
            {label}
        </button>
    );
};


export const DropdownSeparator = () => (
    <div className="my-2 h-px bg-white/10" />
);
