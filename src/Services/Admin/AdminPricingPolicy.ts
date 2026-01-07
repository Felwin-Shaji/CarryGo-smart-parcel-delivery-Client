import toast from "react-hot-toast";
import { API_ADMIN } from "../../constants_Types/apiRoutes";
import type { PricingPolicyResponseDTO } from "../../constants_Types/types/Admin/PricingPolicy.dto";
import type { PricingPolicyFormDTO } from "../../constants_Types/types/BaseTypes/baseAdminPricinPolicy.Dto";
import { useAxios } from "../../hooks/useAxios";

export const useAdminPricingPolicy = () => {
  const axiosInstance = useAxios();


  const getAdminPricing = async () => {
    const res = await axiosInstance.get(API_ADMIN.GET_ADMIN_PRICING);
    return res.data.data as PricingPolicyResponseDTO
  };

  const createAdminPricing = async (
    payload: PricingPolicyFormDTO
  ) => {
    const res = await axiosInstance.post(
      API_ADMIN.CREATE_ADMIN_PRICING,
      payload
    );
    toast.success(res.data.message || "Pricing Policy Created Successfully");
    return res.data.data as PricingPolicyResponseDTO;
  };

  return {
    getAdminPricing,
    createAdminPricing
  }
}