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
  id: string;
  name: string;
  mobile: string;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
  isBlocked: boolean;
}


type DateRangeType =
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
  type: string;
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
  | "LOADED"
  | "IN_TRANSIT"
  | "UNLOADED";

export interface ShipmentParcelUI {
  id: string;
  bookingId: string;

  customerName?: string;
  address?: string;

  status: ShipmentParcelStatus;
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