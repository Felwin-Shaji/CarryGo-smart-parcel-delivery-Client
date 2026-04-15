import type { Roles } from "../../../../../../constants_Types/types/roles";
import type { ParcelAction, WorkerShipmentParcel } from "../../../../../../constants_Types/types/Worker/workerShipment";
import { ParcelRow } from "./ParcelRow";

type Props = {
    parcels: WorkerShipmentParcel[];
    role: Roles;
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    selectionMode: boolean;
    setSelectionMode: (v: boolean) => void;
    onParcelAction?: (ids: string[], action: ParcelAction) => void;
    onOpenParcel?: (id: string) => void;
    canParcelProceed: (action: ParcelAction) => boolean;
};

export function ParcelList({
    parcels,
    role,
    selected,
    setSelected,
    selectionMode,
    setSelectionMode,
    onParcelAction,
    onOpenParcel,
    canParcelProceed,
}: Props) {

    const handleSelectAll = () => {
        if (selected.length === parcels.length) {
            setSelected([]);
        } else {
            setSelected(parcels.map((p: WorkerShipmentParcel) => p.id));
        }
    };

    const getBulkAction = () => {
        const selectedParcels = parcels.filter((p: WorkerShipmentParcel) =>
            selected.includes(p.id)
        );

        if (selectedParcels.length === 0) return null;

        // get first parcel status
        const firstStatus = selectedParcels[0].status;

        // ensure all same status
        const allSame = selectedParcels.every(p => p.status === firstStatus);

        if (!allSame) return null;

        if (firstStatus === "PENDING") return "LOAD";
        if (firstStatus === "LOADED") return "TRANSIT";
        if (firstStatus === "IN_TRANSIT") return "UNLOAD";

        return null;
    };

    const bulkAction = getBulkAction();

    const isBulkAllowed = bulkAction && canParcelProceed(bulkAction);

    return (
        <div className="bg-white rounded-xl border">

            {/*  Header */}
            <div className="p-3 flex justify-between items-center">


                <span className="text-sm text-gray-600">
                    Parcels ({parcels.length})
                </span>

                {role === "worker" && (
                    <div className="flex gap-2">

                        {selectionMode && selected.length > 0 && bulkAction && (
                            <button
                                disabled={!isBulkAllowed}
                                onClick={() => onParcelAction?.(selected, bulkAction)}
                                className={`px-4 py-2 rounded-lg ${isBulkAllowed
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {bulkAction} Selected ({selected.length})
                            </button>
                        )}
                        {!selectionMode ? (
                            <button
                                onClick={() => setSelectionMode(true)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                            >
                                Select
                            </button>
                        ) : (
                            <div className="flex gap-2">

                                <button
                                    onClick={handleSelectAll}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                                >
                                    {selected.length === parcels.length ? "Unselect All" : "Select All"}
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectionMode(false);
                                        setSelected([]);
                                    }}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
                                >
                                    Cancel
                                </button>

                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Rows */}
            {parcels.map((parcel: WorkerShipmentParcel) => (
                <ParcelRow
                    parcel={parcel}
                    role={role}
                    selectionMode={selectionMode}
                    selected={selected.includes(parcel.id)}
                    onSelect={() =>
                        setSelected((prev: string[]) =>
                            prev.includes(parcel.id)
                                ? prev.filter(p => p !== parcel.id)
                                : [...prev, parcel.id]
                        )
                    }
                    // onAction={onParcelAction}
                    onOpen={onOpenParcel}
                />
            ))}
        </div>
    );
};