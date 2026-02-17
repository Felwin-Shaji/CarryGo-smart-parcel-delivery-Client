import toast from "react-hot-toast";
import { API_ADMIN } from "../../constants_Types/apiRoutes";
import type { PricingPolicyResponseDTO, TravelerPricingPolicyResponseDTO } from "../../constants_Types/types/Admin/PricingPolicy.dto";
import type { PricingPolicyFormDTO, TravelerPricingFormType } from "../../constants_Types/types/BaseTypes/baseAdminPricinPolicy.Dto";
import { useAxios } from "../../hooks/useAxios";

export const useAdminPricingPolicy = () => {
  const axiosInstance = useAxios();


  const getAdminAgencyPricing = async () => {
    const res = await axiosInstance.get(API_ADMIN.ADMIN_AGENCY_PRICING);
    return res.data.data as PricingPolicyResponseDTO
  };

  const createAdminAgencyPricing = async (
    payload: PricingPolicyFormDTO
  ) => {
    const res = await axiosInstance.post(
      API_ADMIN.ADMIN_AGENCY_PRICING,
      payload
    );
    toast.success(res.data.message || "Pricing Policy Created Successfully");
    return res.data.data as PricingPolicyResponseDTO;
  };

  const getAdminTravelerPricing = async ()=>{
        const res = await axiosInstance.get(API_ADMIN.ADMIN_TRAVELER_PRICING);
    return res.data.data as TravelerPricingPolicyResponseDTO
  }

  const createAdminTravelerPricing = async (
    payload: TravelerPricingFormType
  ) => {
    const res = await axiosInstance.post(
      API_ADMIN.ADMIN_TRAVELER_PRICING,
      payload
    );
    toast.success(res.data.message || "Traveler Pricing Policy Created Successfully");
    return res.data.data as TravelerPricingPolicyResponseDTO;
  }

  return {  
    getAdminAgencyPricing,
    createAdminAgencyPricing,
    getAdminTravelerPricing,
    createAdminTravelerPricing
  }
}