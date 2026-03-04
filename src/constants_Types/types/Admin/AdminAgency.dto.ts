import type { KYCStatus } from "../roles";

/**
 * agency with kyc after lookup
 */
export interface KycResponseDTO {
  id: string;
  PAN_photo: string;
  PANnumber: string;
  gst_certificate: string;
  gst_number: string;
  tradeLicenseDocument: string;
  tradeLicenseNumber: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "RESUBMITTED";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface AgencyWithKYCResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isBlocked: boolean;
  kycStatus: KYCStatus;
  createdAt: Date;
  rejectReason?: string | null;

  kyc: KycResponseDTO | null;
};

export interface HubResponseDTO {
    id: string;
    name: string;
    email: string;
    mobile: string;
    isBlocked: boolean;
    kycStatus: KYCStatus;
    createdAt: Date;
};

export interface GetHubsResponseDTO {
    data: HubResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

/**
 * Agency over view kyc_detail and  
 */
export interface GetAgencyOverviewResponseDTO {
  agency:AgencyWithKYCResponseDTO,
  hubs:GetHubsResponseDTO 
}