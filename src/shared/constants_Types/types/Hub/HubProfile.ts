import type { BaseResetPasswordRequestDTO, BaseUserDTO } from "../BaseTypes/baseTypes.dto";
import type { Roles } from "../roles";

export interface GetHubProfileDTO extends BaseUserDTO {
    role: Roles;
}

export interface HubResetPasswordRequestDTO extends BaseResetPasswordRequestDTO {}