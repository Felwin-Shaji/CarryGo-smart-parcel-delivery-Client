import type { PricingPolicyFormDTO } from "../BaseTypes/baseAdminPricinPolicy.Dto";

export interface PricingPolicyResponseDTO
  extends PricingPolicyFormDTO {

  id: string;

  policyVersion: number;
  isActive: boolean;
}



export interface PricingPolicyDTO extends PricingPolicyFormDTO {};
