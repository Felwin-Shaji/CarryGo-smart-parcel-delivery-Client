export interface BaseUserDTO {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isBlocked: boolean;
  kycStatus: string;
  createdAt: Date;
}