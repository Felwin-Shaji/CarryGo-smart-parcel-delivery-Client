import type { ShipmentParcelStatus } from "../Hub/HubShipment";

export type WorkerParcelItemDTO = {
  id: string;
  shipmentId: string;
  bookingId: string;

  status: ShipmentParcelStatus;

  loadedAt: Date | null;
  unloadedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  shipmentType: string;
};

export interface GetParcelsResponse {
  data: WorkerParcelItemDTO[];
  total: number;
  page: number;
  totalPages: number;
};

export interface GetWorkerDashboardResponseDTO {
  worker: {
    id: string;
    name: string;
    workerRole: string;
    // workingStatus: string;
  };

  summary: {
    completedShipmentCount: number;
    completedParcelCount: number;
    todayShipmentCount: number;
    todayParcelHandledCount: number;
    pendingParcelCount: number;
    completionRate: number; // %
  };

  activeShipment: {
    id: string;
    type: string;
    status: string;
    fromHubId: string;
    toHubId: string;
    // vehicleNumber: string;
    parcelCount: number;
  } | null;
};


// GET /worker/graph
export interface GetWorkerGraphRequestDTO {
  fromDate?: string;
  toDate?: string;
  status?: string;
};

export interface WorkerGraphPointDTO {
  date: string; // "2026-04-01"
  count: number;
}

export interface GetWorkerGraphResponseDTO {
  series: WorkerGraphPointDTO[];
}