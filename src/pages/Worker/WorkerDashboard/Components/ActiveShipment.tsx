import { Truck, MapPin, Package } from "lucide-react";

type Shipment = {
    id: string;
    type: string;
    status: string;
    from: string;
    to: string;
    count: number;
};

type Props = {
    shipment: Shipment | null;
};

export const ActiveShipment = ({ shipment }: Props) => {

    const statusColor = {
        LOADING: "bg-yellow-100 text-yellow-700",
        IN_TRANSIT: "bg-blue-100 text-blue-700",
        DELIVERED: "bg-green-100 text-green-700",
    } as Record<string, string>;

    if (!shipment) {
        return (
            <div className="bg-white rounded-2xl p-4 shadow flex flex-col items-center justify-center text-center h-[180px]">

                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                    <Truck size={20} className="text-gray-400" />
                </div>

                <p className="text-sm font-medium text-gray-700">
                    No active shipment
                </p>
                <p className="text-xs text-gray-400">
                    Shipment will appear once assigned
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition">

            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">
                    Active Shipment
                </p>

                <span
                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColor[shipment.status] || "bg-gray-200 text-gray-600"
                        }`}
                >
                    {shipment.status}
                </span>
            </div>


            <p className="text-xs text-gray-400 mb-2">
                #{shipment.id}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                <MapPin size={14} className="text-gray-400" />
                <span className="truncate">
                    {shipment.from} → {shipment.to}
                </span>
            </div>

            <div className="flex items-center justify-between text-sm">

                <div className="flex items-center gap-2 text-gray-600">
                    <Package size={14} />
                    <span>{shipment.count} parcels</span>
                </div>


            </div>
        </div>
    );
};