import type { PricingPolicyDTO } from "../Admin/PricingPolicy.dto";
import type { BaseAgencyPricingDTO } from "../BaseTypes/baseAgencyPricing.Dto";

export interface AgencyPricingDTO
  extends BaseAgencyPricingDTO {

  isActive: boolean;
  policyVersion: number;
}

export interface AgencyPricingResponseDTO {
  agencyPricing: AgencyPricingDTO;
  policy: PricingPolicyDTO;
  isOutdated: boolean;
}


export interface AgencyPricingRequestDTO
  extends BaseAgencyPricingDTO {}
