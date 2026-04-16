import type { ShipmentParcelUI } from "../../../../../../constants_Types/types/Hub/HubShipment";
import type { Roles } from "../../../../../../constants_Types/types/roles";
import type { ParcelAction,  } from "../../../../../../constants_Types/types/Worker/workerShipment";
import { ParcelRow } from "./ParcelRow";

type Props = {
    parcels: ShipmentParcelUI[];
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
            setSelected(parcels.map((p: ShipmentParcelUI) => p.id));
        }
    };

    const getBulkAction = () => {
        const selectedParcels = parcels.filter((p: ShipmentParcelUI) =>
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
       <div className="bg-white rounded-xl border overflow-hidden">

    {/* 🔥 Top Bar (Title + Actions) */}
    <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">

        <p className="text-sm font-semibold text-gray-700">
            Parcels ({parcels.length})
        </p>

        {role === "worker" && (
            <div className="flex items-center gap-2">

                {selectionMode && selected.length > 0 && bulkAction && (
                    <button
                        disabled={!isBulkAllowed}
                        onClick={() => onParcelAction?.(selected, bulkAction)}
                        className={`px-3 py-1.5 text-xs rounded-md ${
                            isBulkAllowed
                                ? "bg-orange-500 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {bulkAction} ({selected.length})
                    </button>
                )}

                {!selectionMode ? (
                    <button
                        onClick={() => setSelectionMode(true)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md"
                    >
                        Select
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleSelectAll}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md"
                        >
                            {selected.length === parcels.length
                                ? "Unselect All"
                                : "Select All"}
                        </button>

                        <button
                            onClick={() => {
                                setSelectionMode(false);
                                setSelected([]);
                            }}
                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-xs rounded-md"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        )}
    </div>

    {/* 🔥 Table Header */}
    <div className="grid grid-cols-[30px_1.5fr_1fr_2fr_80px_120px] px-3 py-2 bg-gray-100 text-xs font-medium text-gray-600">
        <div></div>
        <div>Parcel</div>
        <div className="hidden sm:block">Customer</div>
        <div className="hidden md:block">Address</div>
        <div className="text-center">Time</div>
        <div className="text-right">Status</div>
    </div>

    {/* 🔥 Rows */}
    <div>
        {parcels.map((parcel: ShipmentParcelUI) => (
            <ParcelRow
                key={parcel.id}
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
                onOpen={onOpenParcel}
            />
        ))}
    </div>
</div>
    );
};