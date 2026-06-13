import type { BaseResetPasswordRequestDTO, BaseUserDTO } from "../BaseTypes/baseTypes.dto";
import type { Roles } from "../roles";

export interface GetWorkerProfileDTO extends BaseUserDTO {
    role: Roles;
}

export interface WorkerResetPasswordRequestDTO extends BaseResetPasswordRequestDTO { }