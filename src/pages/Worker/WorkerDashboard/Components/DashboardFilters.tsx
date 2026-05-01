import { useState, useMemo } from "react";
import type { ShipmentParcelStatus } from "../../../../shared/constants_Types/types/Hub/HubShipment";

interface Props {
    onApply: (filters: {
        fromDate?: string;
        toDate?: string;
        status?: ShipmentParcelStatus;
    }) => void;
    onClear: () => void;
    onExportPDF: () => void;
    onExportExcel: () => void;
}

export const DashboardFilters = ({
    onApply,
    onExportPDF,
    onExportExcel,
    onClear
}: Props) => {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState<ShipmentParcelStatus | "">("");

    // Check if any filter is active
    const hasFilters = useMemo(() => {
        return fromDate || toDate || status;
    }, [fromDate, toDate, status]);

    const handleApply = () => {
        onApply({
            fromDate,
            toDate,
            status: status || undefined,
        });
    };

    const handleClear = () => {
        setFromDate("");
        setToDate("");
        setStatus("");
        onClear();
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            {/* FILTERS */}
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl w-fit">

                {/* From Date */}
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-[140px] px-2 py-1 text-sm border rounded-md"
                />

                <span className="text-gray-400 text-sm">—</span>

                {/* To Date */}
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-[140px] px-2 py-1 text-sm border rounded-md"
                />

                {/* Status */}
                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value as ShipmentParcelStatus | "")
                    }
                    className="w-[140px] px-2 py-1 text-sm border rounded-md"
                >
                    <option value="">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="LOADED">Loaded</option>
                    <option value="IN_TRANSIT">Transit</option>
                    <option value="UNLOADED">Done</option>
                </select>

                {/* Apply */}
                <button
                    onClick={handleApply}
                    className="px-3 py-1 text-sm bg-gray-900 text-white rounded-md"
                >
                    Apply
                </button>

                {/* Clear (conditional) */}
                {hasFilters && (
                    <button
                        onClick={handleClear}
                        className="px-3 py-1 text-sm bg-gray-200 rounded-md"
                    >
                        Clear
                    </button>
                )}
            </div>
            {/*  EXPORT BUTTONS */}
            <div className="flex gap-2">
                <button
                    onClick={onExportPDF}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                    PDF
                </button>

                <button
                    onClick={onExportExcel}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                    Excel
                </button>
            </div>
        </div>
    );
};