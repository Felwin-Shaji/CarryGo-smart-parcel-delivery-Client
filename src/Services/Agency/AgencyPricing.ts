import { API_AGENCY } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";
import type { AgencyPricingRequestDTO, AgencyPricingResponseDTO } from "../../constants_Types/types/Agency/AgencyPricing.dto";
import toast from "react-hot-toast";


export const useAgencyPricing = () => {
    const axiosInstance = useAxios();

    const getAgencyPricing = async () => {
        const res = await axiosInstance.get(API_AGENCY.GET_PRICING);
        return res.data.data as AgencyPricingResponseDTO
    };

    const updateAgencyPricing = async (pricingData: AgencyPricingRequestDTO) =>{
        const res = await axiosInstance.post(API_AGENCY.UPDATE_PRICING,pricingData);
        toast.success(res.data.message)
        return res.data.data as AgencyPricingResponseDTO
    } 

    return {
        getAgencyPricing,
        updateAgencyPricing
    }
}