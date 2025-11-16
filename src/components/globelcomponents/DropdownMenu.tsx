import { useState, useRef, useEffect, type ReactNode, } from "react";

export interface DropdownItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    danger?: boolean;
}

interface DropdownMenuProps {
    trigger: ReactNode; 
    items: DropdownItem[];
    align?: "left" | "right";
    width?: string // "w-48" or "w-60"
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    trigger,
    items,
    align = "right",
    width = "w-48",
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative inline-block text-left">
            {/* Trigger Button */}
            <button onClick={() => setOpen((prev) => !prev)}>{trigger}</button>

            {/* Dropdown Items */}
            {open && (
                <div
                    className={`absolute z-50 mt-2 ${width} rounded-lg shadow-md border  ${align === "right" ? "right-0" : "left-0"
                        }`}
                    style={{ backgroundColor: "rgba(41, 79, 247, 0.32)" }}
                >



                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                setOpen(false);
                            }}
                            className={`flex w-full items-center gap-2 px-4 py-2 text-sm  hover:bg-yellow-100 hover:text-[#000] transition ${item.danger ? "text-red-600 hover:bg-red-50" : ""
                                }`}
                        >
                            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
