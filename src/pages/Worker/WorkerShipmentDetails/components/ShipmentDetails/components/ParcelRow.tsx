import type { ParcelAction, WorkerShipmentParcel } from "../../../../../../constants_Types/types/Worker/workerShipment";

type ParcelRowProps = {
    key: string;
    parcel: WorkerShipmentParcel;
    role: string;
    selectionMode: boolean;
    selected: boolean;
    onSelect: () => void;
    onOpen?: (id: string) => void;
    onParcelAction?: (ids: string[], action: ParcelAction) => void;
};

export function ParcelRow({
    key,
    parcel,
    role,
    selectionMode,
    selected,
    onSelect,
    // onAction,
    onOpen,
}: ParcelRowProps) {

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t hover:bg-gray-50">

            {/* LEFT */}
            <div className="flex items-center gap-3">

                {selectionMode && (
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={onSelect}
                    />
                )}

                <div>
                    <p className="font-medium">
                        {parcel.id}
                        <span className="text-xs text-gray-400 ml-2">
                            {parcel.bookingId}
                        </span>
                    </p>

                    <p className="text-xs text-gray-500">
                        Loaded {parcel.loadedAt}
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

                <StatusBadge status={parcel.status} />
                {/* 
                {!selectionMode && action && (
                    <button
                        onClick={() => onParcelAction?.([parcel.id], action)}
                        className="text-blue-600 text-sm font-medium"
                    >
                        {action} →
                    </button>
                )} */}

                <button
                    onClick={() => onOpen?.(parcel.id)}
                    className="text-gray-400"
                >
                    👁
                </button>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: WorkerShipmentParcel["status"] }) {
    const styles: Record<WorkerShipmentParcel["status"], string> = {
        PENDING: "bg-gray-100 text-gray-600",
        LOADED: "bg-blue-100 text-blue-600",
        IN_TRANSIT: "bg-orange-100 text-orange-600",
        UNLOADED: "bg-green-100 text-green-600",
    };

    return (
        <span className={`px-3 py-1 text-xs rounded-full ${styles[status]}`}>
            {status.replace("_", " ")}
        </span>
    );
}
