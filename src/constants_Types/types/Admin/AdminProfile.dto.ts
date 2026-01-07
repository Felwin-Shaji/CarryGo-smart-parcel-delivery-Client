import type { BaseResetPasswordRequestDTO, BaseUserDTO } from "../BaseTypes/baseTypes.dto";
import type { Roles } from "../roles";

export interface GetAdminProfileDTO extends BaseUserDTO {
    role: Roles;
}

export interface AdminResetPasswordRequestDTO extends BaseResetPasswordRequestDTO {}