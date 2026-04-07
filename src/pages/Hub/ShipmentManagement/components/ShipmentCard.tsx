import { Package, User, Calendar, MapPin } from "lucide-react";
import type { Shipment } from "../../../../constants_Types/types/Hub/HubShipment";
import { useNavigate } from "react-router-dom";
import type { ShipmentType } from "../ShipmentManagementPage";

interface ShipmentCardProps {
  shipment: Shipment;
  activeTab: ShipmentType;
  role?: "hub" | "worker"; // 🔥 new
  onStatusUpdate?: (id: string, status: string) => void; // 🔥 new
}

export const ShipmentCard = ({
  shipment,
  activeTab,
  role = "hub",
  onStatusUpdate,
}: ShipmentCardProps) => {
  const navigate = useNavigate();

  const getRoute = () => {
    switch (shipment.type) {
      case "BULK_PICKUP":
        return "Sender → Hub";
      case "HUB_TRANSFER":
        return "Hub Transfer";
      case "OUT_FOR_DELIVERY":
        return "Hub → Customer";
      default:
        return "";
    }
  };

  const statusStyles: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
    DISPATCHED: "bg-blue-100 text-blue-700",
    ARRIVED: "bg-purple-100 text-purple-700",
  };

  // 🔥 Worker action logic
  const getNextAction = () => {
    switch (shipment.status) {
      case "PENDING":
        return { label: "Start", value: "DISPATCHED" };
      case "DISPATCHED":
        return { label: "Mark Arrived", value: "ARRIVED" };
      case "ARRIVED":
        return { label: "Complete", value: "COMPLETED" };
      default:
        return null;
    }
  };

  const action = getNextAction();

  return (
    <div
      onClick={() => {
        if (role === "hub") {
          navigate(`/hub/shipments/${shipment.id}`, {
            state: { fromTab: activeTab },
          });
        }
      }}
      className={`
        bg-white border border-gray-200
        rounded-xl p-4
        shadow-sm hover:shadow-md hover:-translate-y-[2px]
        transition-all duration-200 space-y-3
        ${role === "hub" ? "cursor-pointer group" : ""}
      `}
    >

      {/* 🔥 Worker / Info */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
            <User size={16} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {shipment.assignedWorkerName || "Unassigned"}
            </p>
            <p className="text-[11px] text-gray-400">
              Worker
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`
            text-[11px] px-2 py-1 rounded-full font-medium
            ${statusStyles[shipment.status] || "bg-gray-100 text-gray-600"}
          `}
        >
          {shipment.status}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <MapPin size={14} className="text-gray-400" />
        <span className="font-medium">
          {getRoute()}
        </span>
      </div>

      {/* Shipment ID + Type */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>#{shipment.id.slice(-6)}</span>

        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 font-medium">
          {shipment.type.replace("_", " ")}
        </span>
      </div>

      {/* Bottom Info */}
      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2">
        <div className="flex items-center gap-1">
          <Package size={13} />
          {shipment.parcelCount}/{shipment.capacity ?? 0}
        </div>

        <div className="flex items-center gap-1">
          <Calendar size={13} />
          {new Date(shipment.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* 🔥 Worker Action Button */}
      {role === "worker" && action && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 prevent card click
            onStatusUpdate?.(shipment.id, action.value);
          }}
          className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          {action.label}
        </button>
      )}

    </div>
  );
};