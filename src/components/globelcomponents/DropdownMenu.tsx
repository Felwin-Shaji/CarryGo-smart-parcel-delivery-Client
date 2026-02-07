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
    width = "w-52",
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
            <button onClick={() => setOpen((o) => !o)}>{trigger}</button>

            {open && (
                <div
                    className={`absolute z-50 mt-2 ${width} rounded-xl border border-white/10
  bg-[#0A2374] shadow-lg
  ${align === "right" ? "right-0" : "left-0"}`}
                >

                    {children}
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
        "flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm transition-colors";

    const style = danger
        ? "text-yellow-400 hover:bg-yellow-400/10"
        : "text-white hover:bg-white/10";



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
    <div className="my-1 h-px bg-gray-200" />
);
