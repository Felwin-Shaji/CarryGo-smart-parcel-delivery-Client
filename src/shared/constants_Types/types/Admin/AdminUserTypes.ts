import type { KYCStatus } from "../roles";

export interface UserKYCResponseDTO {
    id: string;

    subjectId: string;
    subjectType: "user";

    idType: "AADHAAR" | "DL" | "PASSPORT";

    idNumberEncrypted: string;

    documentUrl: string;
    selfieUrl: string;

    status: KYCStatus;

    createdAt: string;
    reviewedAt: string | null;
}

/**
 * User + KYC combined response for Admin
 */
export interface UserWithKYCResponseDTO {
    id: string;

    name: string;
    email: string;
    mobile: string;

    role: "user" | "worker" | "agency" | "hub" | "admin";

    kycStatus: KYCStatus;

    walletBalance: number;
    isBlocked: boolean;

    createdAt: string;
    updatedAt: string;
    rejectReason?: string | null;

    /**
     * Traveler KYC (null if not submitted yet)
     */
    kyc: UserKYCResponseDTO | null;
}