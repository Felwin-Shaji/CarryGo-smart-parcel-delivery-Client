import type { Roles } from "../roles";

export type WorkerRole = "PICKUP" | "TRANSPORT" | "OUT_FOR_DELEVERY";
export type IDType = "AADHAAR" | "DL" | "PASSPORT";

export type WorkingStatus =
  | "AVAILABLE"   // ready for assignment
  | "BUSY"        // already assigned to shipment
  | "OFF_DUTY"
  | "ON_LEAVE"
  | "BREAK";

export interface userKycResponseDTO {
  id: string;
  subjectId: string;
  subjectType: Roles;
  idType: IDType;
  idNumberEncrypted: string;
  documentUrl: string;
  selfieUrl: string;
  status: KYCStatus;
  createdAt: Date;
  reviewedAt: Date | null;
}

export type KYCStatus = "PENDING" | "REGISTERED" | "APPROVED" | "REJECTED" | "RESUBMITTED";

export interface GetWorkerOverviewResponseDTO {
  id: string;
  name: string;
  email: string;
  mobile?: string;

  role: Roles;
  workerRole: WorkerRole;
  workingStatus: WorkingStatus;

  kycStatus: KYCStatus;
  walletBalance: number;
  isBlocked: boolean;

  createdAt: Date;

  kyc: userKycResponseDTO | null;
}