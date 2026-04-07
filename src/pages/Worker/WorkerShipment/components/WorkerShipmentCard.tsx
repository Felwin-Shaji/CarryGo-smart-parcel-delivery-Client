import { MapPin, Package, Calendar, ChevronRight } from "lucide-react";
import type { WorkerShipment } from "../../../../constants_Types/types/Worker/workerShipment";
import { useNavigate } from "react-router-dom";

interface WorkerShipmentCardProps {
  shipment: WorkerShipment;
}

export const WorkerShipmentCard = ({ shipment }: WorkerShipmentCardProps) => {
  const navigate = useNavigate();

  const getRoute = () => {
    switch (shipment.type) {
      case "BULK_PICKUP":
        return "Sender → Hub";
      case "HUB_TRANSFER":
        return "Hub → Hub";
      case "OUT_FOR_DELIVERY":
        return "Hub → Customer";
      default:
        return "";
    }
  };

  const getStatusStyle = () => {
    switch (shipment.status) {
      case "COMPLETED":
        return "bg-green-100 text-green-600";
      case "LOADING":
        return "bg-blue-100 text-blue-600";
      case "DISPATCHED":
        return "bg-orange-100 text-orange-600";
      case "ARRIVED":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      onClick={() => navigate(`/worker/shipments/${shipment.id}`)}
      className="bg-white border rounded-xl p-4 shadow-sm cursor-pointer 
                 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group space-y-3"
    >

      {/* 🔥 Top: Route + Status */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin size={14} className="text-gray-400" />
          {getRoute()}
        </div>

        <span className={`text-[11px] px-2 py-1 rounded-full ${getStatusStyle()}`}>
          {shipment.status}
        </span>
      </div>

      {/* 🔥 ID + Type */}
      <div className="flex justify-between items-center">

        <div>
          <p className="text-lg font-semibold text-gray-900 tracking-wide">
            #{shipment.id.slice(-6)}
          </p>
          <p className="text-[11px] text-gray-400">
            {shipment.id}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">
            {shipment.type.replaceAll("_", " ")}
          </span>

          <ChevronRight
            size={18}
            className="text-gray-300 group-hover:text-gray-500 transition"
          />
        </div>
      </div>

      {/* 🔥 Divider */}
      <div className="border-t" />

      {/* 🔥 Info */}
      <div className="flex justify-between text-xs text-gray-500">

        <div className="flex items-center gap-1">
          <Package size={13} />
          <span className="font-medium text-gray-700">
            {shipment.parcelCount}
          </span>
          <span className="text-gray-400">
            / {shipment.capacity ?? 0}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={13} />
          {new Date(shipment.createdAt).toLocaleDateString()}
        </div>

      </div>

    </div>
  );
};