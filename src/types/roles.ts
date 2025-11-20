export const ROLES = {
  USER: "user",
  AGENCY: "agency",
  ADMIN: "admin",
  HUB: "hub",
  WORKER: "worker",
} as const;


export type Roles = "user" | "admin" | "agency" | "hub" | "worker"

export type KYCStatus =
  | "PENDING"
  | "REGISTERED"
  | "APPROVED"
  | "REJECTED";

export const KYCSTATUS = {
  PENDING:"PENDING",
  REGISTERED:"REGISTERED",
  APPROVED:"APPROVED",
  REJECTED:"REJECTED"
} as const