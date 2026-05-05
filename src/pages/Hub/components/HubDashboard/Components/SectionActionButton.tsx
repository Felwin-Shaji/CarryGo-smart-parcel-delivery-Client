import type { ReactNode } from "react";

type SectionActionButtonProps = {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
};

export const SectionActionButton = ({
    label,
    onClick,
    icon,
    disabled = false,
}: SectionActionButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        group inline-flex items-center gap-1
        h-7 px-3
        text-xs font-medium
        text-gray-700
        bg-white
        border border-gray-200
        rounded-xl

        hover:bg-gray-50
        hover:shadow-sm

        active:scale-95
        transition-all duration-200

        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
        >
            {icon && (
                <span className="text-gray-500 group-hover:text-gray-700 transition">
                    {icon}
                </span>
            )}
            {label}
        </button>
    );
};