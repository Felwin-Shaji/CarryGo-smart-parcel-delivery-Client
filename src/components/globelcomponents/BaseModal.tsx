
/**
 * Modal Input
 */
import { useState } from "react";

export const ModalInput = ({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
                {label}
            </label>

            <div className="relative">
                <input
                    type={inputType}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300
                     px-3 py-2 pr-10 text-sm
                     focus:border-[var(--color-primary)]
                     focus:ring-2 focus:ring-[var(--color-primary)]/20
                     outline-none"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                       text-xs font-semibold text-gray-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </div>
    );
};


/**
 * Base Modal
 */
const BaseModal = ({
    title,
    open,
    onClose,
    children,
}: {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[var(--color-primary)]">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};

export default BaseModal