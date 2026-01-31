import type { KYCStatus, Roles } from "../roles";

export type LoginResponseType = {
    users: {
        id: string;
        name: string;
        email: string;
        role: Roles;
        kycStatus: KYCStatus;
        tokenVersion: number;
    }
    accessToken: string;
}