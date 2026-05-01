import type { ShipmentParcelUI } from "../../../../../../shared/constants_Types/types/Hub/HubShipment";
import type { Roles } from "../../../../../../shared/constants_Types/types/roles";
import type { ParcelAction } from "../../../../../../shared/constants_Types/types/Worker/workerShipment";

type ParcelRowProps = {
    parcel: ShipmentParcelUI;
    role: Roles;
    selectionMode: boolean;
    selected: boolean;
    onSelect: () => void;
    onOpen?: (id: string) => void;
    onParcelAction?: (ids: string[], action: ParcelAction) => void;
};

export function ParcelRow({
    parcel,
    role = "worker",
    selectionMode,
    selected,
    onSelect,
    onOpen,
}: ParcelRowProps) {

    const formatDate = (date?: string | null) => {
        if (!date) return "—";
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="grid grid-cols-[30px_1.5fr_1fr_2fr_80px_120px] items-center px-3 py-2 border-t text-sm hover:bg-gray-50">

            {/* Checkbox (always reserve space) */}
            <div className="flex justify-center">
                {selectionMode && role === "worker" && (
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={onSelect}
                        className="w-4 h-4"
                    />
                )}
            </div>

            {/* Parcel */}
            <div className="truncate">
                <p className="font-medium truncate">{parcel.id}</p>
                <p className="text-xs text-gray-400 truncate">
                    {parcel.bookingTrackId}
                </p>
            </div>

            {/* Customer */}
            <div className="truncate text-gray-600 hidden sm:block">
                {parcel.customerName || "—"}
            </div>

            {/* Address */}
            <div className="truncate text-gray-400 hidden md:block">
                {parcel.address || "—"}
            </div>

            {/* Time */}
            <div className="text-xs text-gray-500 text-center">
                {parcel.status === "LOADED" && formatDate(parcel.loadedAt)}
                {parcel.status === "UNLOADED" && formatDate(parcel.unloadedAt)}
                {(parcel.status === "IN_TRANSIT" || parcel.status === "PENDING") && "—"}
            </div>

            {/* Status + Action */}
            <div className="flex items-center justify-end gap-2">
                <StatusBadge status={parcel.status} />

                <button
                    onClick={() => onOpen?.(parcel.id)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    👁
                </button>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: ShipmentParcelUI["status"] }) {
    const styles = {
        PENDING: "bg-gray-100 text-gray-600",
        LOADED: "bg-blue-100 text-blue-600",
        IN_TRANSIT: "bg-yellow-100 text-yellow-700",
        UNLOADED: "bg-green-100 text-green-600",
    };

    return (
        <span className={`px-2 py-0.5 text-[10px] rounded font-medium ${styles[status]}`}>
            {status.replace("_", " ")}
        </span>
    );
}