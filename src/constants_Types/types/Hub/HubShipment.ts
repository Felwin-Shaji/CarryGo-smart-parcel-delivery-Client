import type { WorkerRole } from "../Worker/workerRequest.dto";

export type ShipmentType =
  | "HUB_TRANSFER"
  | "OUT_FOR_DELIVERY"
  | "BULK_PICKUP";

export type ShipmentStatus =
  | "PENDING"
  | "LOADING"
  | "DISPATCHED"
  | "ARRIVED"
  | "COMPLETED"
  | "CANCELLED";

export type WorkingStatus =
  | "AVAILABLE"   // ready for assignment
  | "BUSY"        // already assigned to shipment
  | "OFF_DUTY"
  | "ON_LEAVE"
  | "BREAK";

export interface Shipment {
  id: string;

  type: ShipmentType;
  status: ShipmentStatus;

  segmentId: string | null;

  fromHubId: string | null;
  toHubId: string | null;

  assignedWorkerId: string | null;
  assignedWorkerName?: string;

  vehicleNumber: string | null;

  capacity: number | null;
  parcelCount: number;

  estimatedDispatchAt: string | null;
  departedAt: string | null;
  arrivedAt: string | null;

  createdAt: string;
}

export interface WorkerForShipment {
  _id: string;
  name: string;
  mobile: string;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
  isBlocked: boolean;
  workerRole: WorkerRole;
  workingStatus: WorkingStatus;
}


export type DateRangeType =
  | "Today"
  | "Yesterday"
  | "Last 7 Days"
  | "Last 30 Days"
  | "Last Year"
  | "Custom";

export interface UIShipmentFilters {
  search: string;
  status: string;
  workerId: string;
  type: ShipmentType | "ALL";
  dateRange: DateRangeType;
  fromDate?: string;
  toDate?: string;
}

export interface ShipmentUI extends Shipment {
  fromHubName?: string;
  toHubName?: string;
}

export interface GetShipmentsResponse {
  shipments: Shipment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type ShipmentParcelStatus =
  | "PENDING"
  | "LOADED"
  | "IN_TRANSIT"
  | "UNLOADED";

export interface ShipmentParcelUI {
  id: string;
  bookingId: string;
  bookingTrackId: string;


  customerName?: string;
  address?: string;

  status: ShipmentParcelStatus;
    loadedAt: string;
  unloadedAt: string | null;
}

export interface ShipmentDetailsUI extends Shipment {
  fromHubName?: string;
  toHubName?: string;

  assignedWorker?: {
    id: string;
    name: string;
    mobile?: string;
  };

  parcels: ShipmentParcelUI[];
}

export interface ShipmentParcelsResponse {
  shipmentDetails: ShipmentDetailsUI;

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}


