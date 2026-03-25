import { AlertCircle, CheckCircle, Clock, Loader2, Package, Search, X } from "lucide-react";
import { useState } from "react";
// import type { Shipment } from "../../../../constants_Types/types/Hub/HubShipment";

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

interface Shipment {
  id: string;
  segmentId: string;
  fromHub: string;
  toHub: string;
  parcelCount: number;
  status: "PENDING" | "LOADING" | "DISPATCHED" | "ARRIVED" | "COMPLETED" | "CANCELLED";
  vehicleNumber: string | null;
  assignedWorkerName: string | null;
  capacity: number | null;
  createdAt: string;
}
 
interface Worker {
  id: string;
  name: string;
  mobile: string;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
  isBlocked: boolean;
}
 
// ─── Mock Data ────────────────────────────────────────────────────────────────
 
export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "SHP001",
    segmentId: "seg1",
    fromHub: "Calicut Central Hub",
    toHub: "Kochi Gateway Hub",
    parcelCount: 12,
    status: "PENDING",
    vehicleNumber: null,
    assignedWorkerName: null,
    capacity: null,
    createdAt: "2025-03-24T08:00:00Z",
  },
  {
    id: "SHP002",
    segmentId: "seg2",
    fromHub: "Calicut Central Hub",
    toHub: "Bangalore South Hub",
    parcelCount: 8,
    status: "PENDING",
    vehicleNumber: null,
    assignedWorkerName: null,
    capacity: null,
    createdAt: "2025-03-24T09:30:00Z",
  },
  {
    id: "SHP003",
    segmentId: "seg3",
    fromHub: "Calicut Central Hub",
    toHub: "Thrissur Hub",
    parcelCount: 23,
    status: "LOADING",
    vehicleNumber: "KL11AB1234",
    assignedWorkerName: "Rahul Menon",
    capacity: 50,
    createdAt: "2025-03-24T07:00:00Z",
  },
  {
    id: "SHP004",
    segmentId: "seg4",
    fromHub: "Calicut Central Hub",
    toHub: "Chennai Central Hub",
    parcelCount: 31,
    status: "DISPATCHED",
    vehicleNumber: "KL07CD5678",
    assignedWorkerName: "Arun Kumar",
    capacity: 40,
    createdAt: "2025-03-23T18:00:00Z",
  },
];
 
export const MOCK_WORKERS: Worker[] = [
  { id: "W001", name: "Rahul Menon", mobile: "9876543210", kycStatus: "VERIFIED", isBlocked: false },
  { id: "W002", name: "Arun Kumar", mobile: "9876543211", kycStatus: "VERIFIED", isBlocked: false },
  { id: "W003", name: "Sreekanth P", mobile: "9876543212", kycStatus: "VERIFIED", isBlocked: false },
  { id: "W004", name: "Dineshan K", mobile: "9876543213", kycStatus: "PENDING", isBlocked: false },
  { id: "W005", name: "Vishnu Das", mobile: "9876543214", kycStatus: "VERIFIED", isBlocked: true },
];



///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////////////
////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

interface AssignWorkerModalProps {
  shipment: Shipment;
  onClose: () => void;
  onAssign: (shipmentId: string, workerId: string, vehicleNumber: string, capacity: number) => Promise<void>;
}
 
const AssignWorkerModal = ({ shipment, onClose, onAssign }: AssignWorkerModalProps) => {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [capacity, setCapacity] = useState<string>("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const availableWorkers = MOCK_WORKERS.filter(
    (w) =>
      w.kycStatus === "VERIFIED" &&
      !w.isBlocked &&
      w.name.toLowerCase().includes(search.toLowerCase())
  );
 
  const handleSubmit = async () => {
    if (!selectedWorkerId) return setError("Please select a worker");
    if (!vehicleNumber.trim()) return setError("Vehicle number is required");
    if (!capacity || Number(capacity) < shipment.parcelCount) {
      return setError(`Capacity must be at least ${shipment.parcelCount} (current parcel count)`);
    }
    setError(null);
    setLoading(true);
    try {
      await onAssign(shipment.id, selectedWorkerId, vehicleNumber, Number(capacity));
      onClose();
    }finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
 
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4"
          style={{ backgroundColor: "var(--color-primary)" }}>
          <div>
            <h2 className="text-white font-bold text-lg">Assign Worker</h2>
            <p className="text-blue-200 text-sm mt-0.5">
              {shipment.fromHub} → {shipment.toHub}
            </p>
          </div>
          <button onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors p-1 rounded-lg"
            style={{ background: "transparent" }}>
            <X size={20} />
          </button>
        </div>
 
        <div className="p-6 space-y-5">
 
          {/* Shipment summary */}
          <div className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 flex-1">
              <Package size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">{shipment.parcelCount} parcels</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Clock size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">ID: {shipment.id}</span>
            </div>
          </div>
 
          {/* Worker selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Driver
            </label>
            <div className="relative mb-2">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search workers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {availableWorkers.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No available workers found</p>
              )}
              {availableWorkers.map((worker) => (
                <div
                  key={worker.id}
                  onClick={() => setSelectedWorkerId(worker.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedWorkerId === worker.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                  }`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}>
                    {worker.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{worker.name}</p>
                    <p className="text-xs text-gray-500">{worker.mobile}</p>
                  </div>
                  {selectedWorkerId === worker.id && (
                    <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
 
          {/* Vehicle number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              placeholder="e.g. KL11AB1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="uppercase text-sm tracking-widest"
            />
          </div>
 
          {/* Capacity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Truck Capacity (parcels)
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Minimum {shipment.parcelCount} — current parcel count
            </p>
            <input
              type="number"
              placeholder={`Min. ${shipment.parcelCount}`}
              min={shipment.parcelCount}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="text-sm"
            />
          </div>
 
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
 
          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold"
              style={{ background: "transparent", color: "#6b7280" }}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ backgroundColor: "var(--color-primary)" }}>
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Assigning...</>
              ) : (
                <><CheckCircle size={16} /> Assign Worker</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignWorkerModal