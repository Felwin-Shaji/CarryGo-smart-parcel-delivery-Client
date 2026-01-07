import type { BaseResetPasswordRequestDTO, BaseUserDTO } from "../BaseTypes/baseTypes.dto";
import type { Roles } from "../roles";

export interface GetAgencyProfileDTO extends BaseUserDTO {
    role: Roles;
}

export interface AgencyResetPasswordRequestDTO extends BaseResetPasswordRequestDTO {}