export interface BaseUserDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isBlocked: boolean;
  kycStatus: string;
  createdAt: Date;
}

/**
 * Base Reset-password request dto
 */
export interface BaseResetPasswordRequestDTO {
  currentPassword:string;
  newPassword:string;
}