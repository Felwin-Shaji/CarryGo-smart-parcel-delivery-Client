import type { KYCStatus, Roles } from "../roles";

export interface HubOverviewResponseDTO {
 id: string;
    agencyId: string;

    name: string;
    email: string;
    mobile: string;

    role: "hub";

    address: {
        addressLine1: string;
        city: string;
        state: string;
        pincode: string;
    };

    location: {
        lat: number;
        lng: number;
    };

    verificationImage: string;
    kycStatus: KYCStatus;
    walletBalance: number;
    isBlocked: boolean;

    createdAt: Date;
}

export interface WorkerResponseDTO {
    hubId: string;
    name: string;
    email: string;
    mobile: string;
    role: Roles;
    kycStatus: KYCStatus;
    createdAt: Date;
};

export interface GetHubWorkersResponseDTO {
    data: WorkerResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface GetHubOverviewResponseDTO {
    hub: HubOverviewResponseDTO;
    workers: GetHubWorkersResponseDTO;
}