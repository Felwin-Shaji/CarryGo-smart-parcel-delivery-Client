import type { WorkerParcelItemDTO } from "../../../../shared/constants_Types/types/Worker/WorkerDashboard";
import { ParcelRow } from "./ParcelRow";

export interface ParcelTableProps {
    data: WorkerParcelItemDTO[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const ParcelTable = ({
    data,
    page,
    totalPages,
    onPageChange,
}: ParcelTableProps) => {

    const totalItems = data?.length || 0;

    return (
        <div className="bg-white rounded-2xl shadow p-4">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                        Parcels
                    </h3>
                    <p className="text-xs text-gray-400">
                        {totalItems} items on this page
                    </p>
                </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm border-separate border-spacing-y-1">
                <thead className="text-gray-500 text-xs uppercase border-b">
                    <tr>
                        <th className="p-3 text-left">Booking ID</th>
                        <th className="p-3 text-left">Shipment</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">updated</th>
                    </tr>
                </thead>

                <tbody>
                    {!data || data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center p-4 text-gray-400">
                                No parcels found
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <ParcelRow key={item.id} item={item} />
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">

                {/* Page Info */}
                <span className="text-sm text-gray-600">
                    Page <span className="font-medium text-gray-900">{page}</span> of{" "}
                    <span className="font-medium text-gray-900">{totalPages}</span>
                </span>

                {/* Controls */}
                <div className="flex items-center gap-2">

                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <button
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
};