export function ParcelList({
    parcels,
    role,
    selected,
    setSelected,
    selectionMode,
    setSelectionMode,
    onParcelAction,
    onOpenParcel,
}: any) {

    const handleSelectAll = () => {
        if (selected.length === parcels.length) {
            setSelected([]);
        } else {
            setSelected(parcels.map((p: any) => p.id));
        }
    };

    return (
        <div className="bg-white rounded-xl border">

            {/* 🔥 Header */}
            <div className="p-3 flex justify-between items-center">

                <span className="text-sm text-gray-600">
                    Parcels ({parcels.length})
                </span>

                {role === "worker" && (
                    <div className="flex gap-2">

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
            {parcels.map((parcel: any) => (
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
                    onAction={onParcelAction}
                    onOpen={onOpenParcel}
                />
            ))}
        </div>
    );
}

function ParcelRow({
    parcel,
    selectionMode,
    selected,
    onSelect,
    onAction,
    onOpen,
}: any) {
    const getNextAction = () => {
        if (parcel.status === "LOADED") return "Transit";
        if (parcel.status === "IN_TRANSIT") return "Unload";
        return null;
    };

    const action = getNextAction();

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

                {!selectionMode && action && (
                    <button
                        onClick={() => onAction?.(parcel.id, action)}
                        className="text-blue-600 text-sm font-medium"
                    >
                        {action} →
                    </button>
                )}

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

function StatusBadge({ status }: any) {
    const styles: any = {
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

export function Badge({ text }: { text: string }) {
    return (
        <span className="px-2 py-1 bg-gray-200 text-xs rounded">
            {text}
        </span>
    );
}