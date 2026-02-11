import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";
import type { ExistingKyc } from "../../../pages/User/Traveler/TravelerConponents/TravelerKYCRejected";

export const useTravelerKyc = () => {
    const axiosInstance = useAxios()

    const submitKyc = async (formData: FormData) => {
        await axiosInstance.post(API_USER.SUBMIT_KYC, formData);
    };

    const getMyKyc = async () => {
        const response = await axiosInstance.get(API_USER.GET_KYC);
        return response.data.data as ExistingKyc;

    };

    const reSubmitKyc = async (formData: FormData) => {
        await axiosInstance.put(API_USER.RESUBMIT_KYC, formData);
    };


    return {
        submitKyc,
        getMyKyc,
        reSubmitKyc,
    };
}
