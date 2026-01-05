import { API_ADMIN } from "../../constants_Types/apiRoutes";
import type { PricingPolicyResponseDTO } from "../../constants_Types/types/Admin/PricingPolicy.dto";
import { useAxios } from "../../hooks/useAxios";

export const useAdminPricingPolicy = () => {
    const axiosInstance = useAxios();


    const getAdminPricing = async () => {
        const res = await axiosInstance.get(API_ADMIN.GET_ADMIN_PRICING);
        return res.data.data as PricingPolicyResponseDTO
    };

    return { getAdminPricing }
}