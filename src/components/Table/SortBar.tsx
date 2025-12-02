import { useState, useEffect } from "react";

export default function AdvancedFilterSortBar({
    columns,
    filters,
    onFilterChange,
    sortBy,
    sortOrder,
    onSortChange,
}: {
    columns: { label: string; field: string; type?: "text" | "number" | "date" }[];
    filters: {
        status?: string;
        kycStatus?: string;
        startDate?: string;
        endDate?: string;
        blocked?: boolean | null;
    };
    onFilterChange: (updated: any) => void;
    sortBy: string;
    sortOrder: "asc" | "desc";
    onSortChange: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);

    // LOCAL STATE for filters (only applied on "Apply" button press)
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync local state if parent filters change (reset button support)
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const updateLocal = (patch: any) => {
        setLocalFilters((prev) => ({ ...prev, ...patch }));
    };

    return (
        <div className="relative w-full flex justify-end">
            {/* FILTER BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded-lg border shadow-sm flex items-center gap-2 "
            >
                Filters & Sort
                <span>{open ? "▲" : "▼"}</span>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute top-12 right-0 w-80 bg-white border shadow-xl rounded-xl p-5 z-50">

                    {/* FILTERS */}
                    <h3 className="font-semibold text-gray-700 mb-3">Filters</h3>

                    {/* BLOCKED */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Blocked Status</label>
                        <select
                            className="mt-1 px-3 py-2 border rounded-lg w-full bg-white"
                            value={
                                localFilters.blocked === null || localFilters.blocked === undefined
                                    ? ""
                                    : String(localFilters.blocked)
                            }
                            onChange={(e) =>
                                updateLocal({
                                    blocked:
                                        e.target.value === ""
                                            ? null
                                            : e.target.value === "true",
                                })
                            }
                        >
                            <option value="">Any</option>
                            <option value="true">Blocked</option>
                            <option value="false">Active</option>
                        </select>
                    </div>

                    {/* KYC STATUS */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">KYC Status</label>
                        <select
                            className="mt-1 px-3 py-2 border rounded-lg w-full"
                            value={localFilters.kycStatus || ""}
                            onChange={(e) => updateLocal({ kycStatus: e.target.value })}
                        >
                            <option value="">Any</option>
                            <option value="APPROVED">Approved</option>
                            <option value="PENDING">Pending</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    {/* DATE RANGE */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Created Date Range</label>

                        <input
                            type="date"
                            className="mt-1 mb-2 px-3 py-2 border rounded-lg w-full"
                            value={localFilters.startDate || ""}
                            onChange={(e) => updateLocal({ startDate: e.target.value })}
                        />

                        <input
                            type="date"
                            className="px-3 py-2 border rounded-lg w-full"
                            value={localFilters.endDate || ""}
                            onChange={(e) => updateLocal({ endDate: e.target.value })}
                        />
                    </div>

                    {/* SORT */}
                    <h3 className="font-semibold text-gray-700 mb-3">Sort</h3>

                    {/* Sort Field */}
                    <select
                        className="px-3 py-2 border rounded-lg w-full mb-3"
                        value={sortBy}
                        onChange={(e) => {
                            const f = e.target.value;
                            if (!f) {
                                onSortChange("");
                                return;
                            }
                            onSortChange(`${f}:${sortOrder}`);
                        }}
                    >
                        <option value="">None</option>
                        {columns.map((col) => (
                            <option key={col.field} value={col.field}>
                                {col.label}
                            </option>
                        ))}
                    </select>

                    {/* Sort Order */}
                    <select
                        disabled={!sortBy}
                        className="px-3 py-2 border rounded-lg w-full disabled:bg-gray-100"
                        value={sortOrder}
                        onChange={(e) => {
                            if (!sortBy) return; // no field selected — ignore
                            onSortChange(`${sortBy}:${e.target.value}`);
                        }}
                    >
                        <option value="asc">Ascending (A → Z)</option>
                        <option value="desc">Descending (Z → A)</option>
                    </select>

                    {/* APPLY */}
                    {/* APPLY + CLEAR BUTTONS */}
                    <div className="mt-5 flex gap-3">

                        {/* CLEAR FILTERS */}
                        <button
                            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            onClick={() => {
                                const cleared = {
                                    blocked: null,
                                    kycStatus: "",
                                    startDate: "",
                                    endDate: "",
                                };

                                setLocalFilters(cleared);        // reset internal state
                                onFilterChange(cleared);         // reset parent filters
                                onSortChange("");                // clear sort too
                                setOpen(false);
                            }}
                        >
                            Clear
                        </button>

                        {/* APPLY FILTERS */}
                        <button
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => {
                                onFilterChange(localFilters);
                                setOpen(false);
                            }}
                        >
                            Apply
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
