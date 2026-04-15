import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useHubAddWorker } from "../../../../Services/Hub/HubAddWorkers";
import type { ShipmentType } from "../../ShipmentManagement/ShipmentManagementPage";
import type { WorkerRole } from "../../HubAddWorkers";
import type { WorkerResponseDTO } from "../../../../constants_Types/types/Agency/HubOverview.type";

interface Props {
    value: string;
    onChange: (id: string) => void;
    shipmentType: ShipmentType;
}

export default function WorkerSelect({ value, onChange, shipmentType }: Props) {
    const { getWrokersList } = useHubAddWorker();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [workers, setWorkers] = useState<WorkerResponseDTO[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => clearTimeout(t);
    }, [search]);

    const { data, isFetching } = useQuery({
        queryKey: ["workers", debouncedSearch, page],
        queryFn: async () => {
            return await getWrokersList({
                search: debouncedSearch,
                page,
                limit: 10,
                // workingStatus: "AVAILABLE",
            });
        },
        placeholderData: (prev) => prev,
    });

    useEffect(() => {
        if (!data) return;

        const newWorkers = data.data || [];

        setWorkers((prev) => {
            if (page === 1) return newWorkers;
            return [...prev, ...newWorkers];
        });

        setHasMore(page < data.totalPages);
    }, [data, page]);

    const roleMap: Record<ShipmentType, WorkerRole> = {
        BULK_PICKUP: "PICKUP",
        HUB_TRANSFER: "TRANSPORT",
        OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
    };

    const filteredWorkers = workers.filter(
        (worker) => worker.workerRole === roleMap[shipmentType]
    );
    return (
        <div className="space-y-2">

            {/* Search */}
            <input
                placeholder="Search worker..."
                className="w-full border rounded-lg p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/*  Dropdown */}
            <div className="border rounded-lg max-h-60 overflow-y-auto">
                {filteredWorkers.map((w) => {
                    return (
                        <div
                            key={w._id}
                            onClick={() => onChange(w._id)}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${value === w._id ? "bg-blue-50" : ""
                                }`}
                        >
                            <p className="text-sm font-medium">{w.name}</p>
                            <p className="text-xs text-gray-500">
                                {w.mobile} • {w.workingStatus}
                            </p>
                        </div>
                    );
                })}

                {/*  Loading */}
                {isFetching && (
                    <div className="p-2 text-xs text-gray-400">
                        Loading...
                    </div>
                )}

                {/*  Load more */}
                {hasMore && !isFetching && (
                    <div
                        className="p-2 text-center text-blue-600 text-sm cursor-pointer"
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Load more
                    </div>
                )}

                {!isFetching && filteredWorkers.length === 0 && (
                    <div className="p-2 text-gray-400 text-sm">
                        No workers found
                    </div>
                )}

            </div>
        </div>
    );
}