import type { BaseUserDTO } from "../BaseTypes/baseTypes.dto";
import type { Roles } from "../roles";

export interface GetUserProfileDTO extends BaseUserDTO {
    role:Roles
}