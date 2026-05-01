import type { PricingPolicyFormDTO, TravelerPricingFormType } from "../BaseTypes/baseAdminPricinPolicy.Dto";

export interface PricingPolicyResponseDTO
  extends PricingPolicyFormDTO {

  id: string;

  policyVersion: number;
  isActive: boolean;
}



export interface PricingPolicyDTO extends PricingPolicyFormDTO { };


export interface TravelerPricingPolicyResponseDTO extends TravelerPricingFormType {
  id: string;

  policyVersion: number;
  isActive: boolean;
}
