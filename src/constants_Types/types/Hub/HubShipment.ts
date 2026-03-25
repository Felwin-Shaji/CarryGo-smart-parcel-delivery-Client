export interface Shipment {
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
 
export interface WorkerForShipment {
  id: string;
  name: string;
  mobile: string;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
  isBlocked: boolean;
}