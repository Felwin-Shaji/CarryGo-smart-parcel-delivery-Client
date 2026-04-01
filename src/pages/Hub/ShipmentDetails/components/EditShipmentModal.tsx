import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHubShipment } from "../../../../Services/Hub/HubShipment";
import type { ShipmentDetailsUI } from "../../../../constants_Types/types/Hub/HubShipment";
import WorkerSelect from "./WorkerSelect";


interface Props {
    shipment: ShipmentDetailsUI;
    onClose: () => void;
}

export default function EditShipmentModal({ shipment, onClose }: Props) {
    const queryClient = useQueryClient();
    const { updateShipment } = useHubShipment();

    const [workerId, setWorkerId] = useState(
        shipment.assignedWorker?.id || ""
    );

    const [capacity, setCapacity] = useState(
        shipment.capacity || shipment.parcelCount
    );

    const [dispatchTime, setDispatchTime] = useState(
        shipment.estimatedDispatchAt
            ? new Date(shipment.estimatedDispatchAt)
                .toISOString()
                .slice(0, 16)
            : ""
    );

    const mutation = useMutation({
        mutationFn: updateShipment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["shipment-details", shipment.id],
            });
            onClose();
        },
    });

    const handleSave = () => {
        if (capacity < shipment.parcelCount) {
            alert(
                `Capacity cannot be less than ${shipment.parcelCount}`
            );
            return;
        }

        mutation.mutate({
            shipmentId: shipment.id,
            workerId,
            capacity,
            estimatedDispatchAt: dispatchTime,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-5">

                <h2 className="text-lg font-semibold">Edit Shipment</h2>

                {/* Worker */}
                <div>
                    <label className="text-sm text-gray-600">
                        Assign Worker
                    </label>

                    <WorkerSelect
                        value={workerId}
                        onChange={setWorkerId}
                    />
                </div>

                {/* Capacity */}
                <div>
                    <label className="text-sm text-gray-600">
                        Capacity ({shipment.parcelCount} loaded)
                    </label>

                    <input
                        type="number"
                        className="w-full mt-1 border rounded-lg p-2"
                        value={capacity}
                        onChange={(e) =>
                            setCapacity(Number(e.target.value))
                        }
                    />

                    {capacity < shipment.parcelCount && (
                        <p className="text-xs text-red-500 mt-1">
                            Cannot be less than current parcel count
                        </p>
                    )}
                </div>

                {/* Dispatch Time */}
                <div>
                    <label className="text-sm text-gray-600">
                        Dispatch Time
                    </label>

                    <input
                        type="datetime-local"
                        className="w-full mt-1 border rounded-lg p-2"
                        value={dispatchTime}
                        onChange={(e) =>
                            setDispatchTime(e.target.value)
                        }
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={mutation.isPending}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        {mutation.isPending ? "Saving..." : "Save"}
                    </button>

                </div>

            </div>
        </div>
    );
}