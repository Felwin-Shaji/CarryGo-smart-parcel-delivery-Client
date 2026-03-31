import { Search, Calendar, Filter } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
// import { Dispatch, SetStateAction } from "react";

type DateRangeType =
    | "Today"
    | "Yesterday"
    | "Last 7 Days"
    | "Last 30 Days"
    | "Last Year"
    | "Custom";

interface FilterState {
    search: string;
    status: string;
    workerId: string;
    type: string;
    dateRange: DateRangeType;
    fromDate?: string;
    toDate?: string;
}

interface FilterBarProps {
    filters: FilterState;
    setFilters: Dispatch<SetStateAction<FilterState>>;
    activeTab: string;
}

const getDateRange = (range: DateRangeType) => {
    const today = new Date();
    const from = new Date();
    const to = new Date();

    switch (range) {
        case "Today":
            break;
        case "Yesterday":
            from.setDate(today.getDate() - 1);
            to.setDate(today.getDate() - 1);
            break;
        case "Last 7 Days":
            from.setDate(today.getDate() - 6);
            break;
        case "Last 30 Days":
            from.setDate(today.getDate() - 29);
            break;
        case "Last Year":
            from.setFullYear(today.getFullYear() - 1);
            break;
        default:
            return null;
    }

    return {
        fromDate: from.toISOString().split("T")[0],
        toDate: to.toISOString().split("T")[0],
    };
};

export const FilterBar = ({
    filters,
    setFilters,
    activeTab,
}: FilterBarProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm mt-4">
            <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">

                {/* Filter Icon */}
                <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                    <Filter size={16} className="text-gray-600" />
                </div>

                {/* Search */}
                <div className="relative w-[220px] flex-shrink-0">
                    <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                        placeholder="Search ID / vehicle"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                        className="pl-9 pr-3 py-2 bg-gray-50 border rounded-lg text-sm w-full outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Status */}
                <select
                    value={filters.status}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            status: e.target.value,
                        }))
                    }
                    className="h-9 px-3 bg-gray-50 border rounded-lg text-sm w-[150px] flex-shrink-0"
                >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="LOADING">Loading</option>
                    <option value="DISPATCHED">Dispatched</option>
                    <option value="ARRIVED">Arrived</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                {/* Worker */}
                <select
                    value={filters.workerId}
                    onChange={(e) =>
                        setFilters((prev) => ({
                            ...prev,
                            workerId: e.target.value,
                        }))
                    }
                    className="h-9 px-3 bg-gray-50 border rounded-lg text-sm w-[160px] flex-shrink-0"
                >
                    <option value="ALL">All Workers</option>
                </select>

                {/* Date Type */}
                <select
                    value={filters.dateRange}
                    onChange={(e) => {
                        const range = e.target.value as DateRangeType;
                        const computed = getDateRange(range);

                        setFilters((prev) => ({
                            ...prev,
                            dateRange: range,
                            fromDate: computed?.fromDate,
                            toDate: computed?.toDate,
                        }));
                    }}
                    className="h-9 px-3 bg-gray-50 border rounded-lg text-sm w-[150px] flex-shrink-0"
                >
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Year</option>
                    <option>Custom</option>
                </select>

                {/* Custom Date */}
                {filters.dateRange === "Custom" && (
                    <div className="flex items-center gap-2 bg-gray-50 border rounded-lg px-2 py-1 flex-shrink-0">
                        <Calendar size={14} className="text-gray-400" />

                        <input
                            type="date"
                            value={filters.fromDate || ""}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    fromDate: e.target.value,
                                }))
                            }
                            className="text-xs bg-transparent outline-none"
                        />

                        <span className="text-gray-400 text-xs">→</span>

                        <input
                            type="date"
                            value={filters.toDate || ""}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    toDate: e.target.value,
                                }))
                            }
                            className="text-xs bg-transparent outline-none"
                        />
                    </div>
                )}

                {/* Clear */}
                <button
                    onClick={() =>
                        setFilters({
                            search: "",
                            status: "ALL",
                            workerId: "ALL",
                            type: activeTab,
                            dateRange: "Today",
                            fromDate: undefined,
                            toDate: undefined,
                        })
                    }
                    className=" ml-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 
                    border border-gray-200 rounded-lg hover:bg-gray-200 hover:text-gray-800 transition-all duration-150 flex-shrink-0" >
                    ✕ Clear
                </button>

            </div>
        </div>
    );
};