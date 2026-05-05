import type {  ShipmentStatus, ShipmentType } from "./HubShipment";

/**
 * GET /hub/dashboard/summary
 */
export interface GetHubDashboardSummaryRequestDTO {
    from?: string;
    to?: string;
};

export interface GetHubDashboardSummaryResponseDTO {
    shipments: {
        total: number;
        pending: number;
        active: number;
        arrived: number;
        completed: number;
        cancelled: number;
    };

    workers: {
        total: number;
        blocked: number;
        kyc: {
            pending: number;
            approved: number;
            rejected: number;
        };
    };
};

/**
 * GET /hub/dashboard/trend
 */

export interface GetHubDashboardTrendRequestDTO {
    from?: string;
    to?: string;
};

export interface HubShipmentTrendItemDTO {
    date: string;
    count: number;
};

export interface GetHubDashboardTrendResponseDTO {
    trend: HubShipmentTrendItemDTO[];
};

/**
 * GET /hub/dashboard/types
 */
export interface GetHubDashboardTypesResponseDTO {
    hubTransfer: number;
    outForDelivery: number;
    bulkPickup: number;
};

/**
 * GET /hub/dashboard/shipments-preview
 */
export type HubShipmentListItemDTO = {
  type: ShipmentType;
  status: ShipmentStatus;
  parcelCount: number;
  assignedWorkerId: string | null;
  createdAt: string;
};

export interface GetHubDashboardShipmentsPreviewResponseDTO {
    recentShipments: HubShipmentListItemDTO[];
    unassignedShipments: HubShipmentListItemDTO[];
}

export type ShipmentRow = {
    type: ShipmentType;
    status: ShipmentStatus;
    parcelCount: number;
    assignedWorkerId: string | null;
    createdAt: string;
};

export interface Column<T> {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
}