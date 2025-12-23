import type { Roles } from "../roles";

export interface TempRegisterWorkerResponseDto {
    email:string;
    expiresAt:string;
    role:Roles;
    tempWorkerId:string;
}