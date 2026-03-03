const StepIndicator = ({
    active,
    label,
    number,
}: {
    active?: boolean;
    label: string;
    number: number;
}) => (
    <div className="flex items-center gap-3">
        <div
            className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold ${active
                ? "bg-black text-white"
                : "border border-gray-300 text-gray-400"
                }`}
        >
            {number}
        </div>
        <span
            className={`text-sm ${active ? "text-black font-medium" : "text-gray-400"
                }`}
        >
            {label}
        </span>
    </div>
);

export const StepDivider = () => (
    <div className="w-16 h-[1px] bg-gray-200" />
);

export default StepIndicator