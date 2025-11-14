export const ROLES = {
  USER: "user",
  AGENCY: "agency",
  ADMIN: "admin",
  HUB: "hub",
  WORKER: "worker",
} as const;


export type Roles = "user" | "admin" | "agency" | "hub" | "worker"