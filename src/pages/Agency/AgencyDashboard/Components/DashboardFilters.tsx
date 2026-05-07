import { useState } from "react";
import {
    CalendarDays,
    X,
    Check,
} from "lucide-react";

type Props = {
    onChange: (filters: {
        fromDate?: string;
        toDate?: string;
    }) => void;
};

const presets = [
    { key: "today", label: "Today" },
    { key: "week", label: "Last 7 Days" },
    { key: "month", label: "Last Month" },
    { key: "year", label: "Last Year" },
];

const getRange = (type: string) => {
    const now = new Date();
    const from = new Date();

    switch (type) {
        case "today":
            from.setHours(0, 0, 0, 0);
            break;

        case "week":
            from.setDate(now.getDate() - 7);
            break;

        case "month":
            from.setMonth(now.getMonth() - 1);
            break;

        case "year":
            from.setFullYear(now.getFullYear() - 1);
            break;

        default:
            return {};
    }

    return {
        fromDate: from.toISOString(),
        toDate: now.toISOString(),
    };
};

const DashboardFilters = ({ onChange }: Props) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [active, setActive] = useState("");
    const [error, setError] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const applyPreset = (type: string) => {
        setActive(type);
        setError("");

        onChange(getRange(type));
    };

    const applyCustom = () => {
        if (!fromDate || !toDate) {
            setError("Please select both dates");
            return;
        }

        const from = new Date(fromDate);
        const to = new Date(toDate);
        const now = new Date();

        if (from > now || to > now) {
            setError("Future dates are not allowed");
            return;
        }

        if (from > to) {
            setError("From date cannot be greater than To date");
            return;
        }

        setError("");
        setActive("custom");

        onChange({
            fromDate: from.toISOString(),
            toDate: to.toISOString(),
        });
    };

    const clearFilters = () => {
        setFromDate("");
        setToDate("");
        setActive("");
        setError("");

        onChange({});
    };

    return (
        <div
            className="
                w-full
                bg-white
                border border-slate-200
                rounded-2xl
                shadow-sm
                px-5 
                py-2
            "
        >
            <div
                className="
                    flex flex-col
                    2xl:flex-row
                    2xl:items-center
                    2xl:justify-between
                    gap-4
                    "
            >
                {/* LEFT SIDE */}
                <div className="flex flex-wrap items-center gap-3">
                    {presets.map((item) => {
                        const isActive = active === item.key;

                        return (
                            <button
                                key={item.key}
                                onClick={() => applyPreset(item.key)}
                                className={`
                                    h-8
                                    px-6
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    border
                                    transition-all
                                    duration-200
                                    flex items-center gap-2
                                    whitespace-nowrap
                                    ${isActive
                                        ? `
                                            bg-slate-900
                                            text-white
                                            border-slate-900
                                            shadow-sm
                                        `
                                        : `
                                            bg-white
                                            text-slate-600
                                            border-slate-200
                                            hover:border-slate-300
                                            hover:bg-slate-50
                                        `
                                    }
                                `}
                            >
                                {isActive && (
                                    <Check className="w-4 h-4" />
                                )}

                                {item.label}
                            </button>
                        );
                    })}

                    {/* CLEAR */}
                    <button
                        onClick={clearFilters}
                        className="
                            h-8
                            px-6
                            rounded-xl
                            border border-red-200
                            text-red-600
                            bg-red-50
                            hover:bg-red-100
                            transition-all
                            duration-200
                            text-sm
                            font-medium
                            flex items-center gap-2
                            "
                    >
                        <X className="w-4 h-4" />
                        Clear
                    </button>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-2">
                    <div
                        className="
                            flex flex-col
                            lg:flex-row
                            lg:items-center
                            gap-3
                            "
                    >
                        {/* FROM DATE */}
                        <div className="relative">
                            <CalendarDays
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    w-4 h-4
                                    text-slate-400
                                    "
                            />

                            <input
                                type="date"
                                value={fromDate}
                                max={today}
                                onChange={(e) =>
                                    setFromDate(e.target.value)
                                }
                                className="
                                    h-6
                                w-[200px]
                                rounded-xl
                                border border-slate-150
                                bg-white
                                pl-10 pr-4
                                text-sm
                                text-slate-700
                                outline-none
                                transition-all
                                duration-200
                                focus:border-slate-900
                                focus:ring-2
                                focus:ring-slate-900/10
                                "
                            />
                        </div>

                        <span className="hidden lg:block text-slate-400 text-sm">
                            to
                        </span>

                        {/* TO DATE */}
                        <div className="relative">
                            <CalendarDays
                                className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                w-4 h-4
                                text-slate-400
                                "
                            />

                            <input
                                type="date"
                                value={toDate}
                                max={today}
                                onChange={(e) =>
                                    setToDate(e.target.value)
                                }
                                className="
                                    h-6
                                    w-[200px]
                                    rounded-xl
                                    border border-slate-150
                                    bg-white
                                    pl-10 pr-4
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    transition-all
                                    duration-200
                                    focus:border-slate-900
                                    focus:ring-2
                                    focus:ring-slate-900/10
                                    "
                            />
                        </div>

                        {/* APPLY BUTTON */}
                        <button
                            onClick={applyCustom}
                            className="
                                h-8
                                px-6
                                rounded-xl
                                bg-slate-900
                                text-white
                                text-sm
                                font-medium
                                hover:bg-slate-800
                                active:scale-[0.98]
                                transition-all
                                duration-200
                                shadow-sm
                                whitespace-nowrap
                            "
                        >
                            Apply Filter
                        </button>
                    </div>
                    <div>

                        {error && (
                            <span className="text-xs text-red-500 ml-1">
                                {error}
                            </span>
                        )}
                    </div>

                    {/* ERROR */}
                </div>
            </div>
        </div>
    );
};

export default DashboardFilters;