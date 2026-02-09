import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";

export const useTravelerKyc = () => {
    const axiosInstance = useAxios()

    const submitKyc = async (formData: FormData) => {
        console.log("Submitting KYC with payload:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        };

        console.log("FormData submitted:", formData)

        await axiosInstance.post(API_USER.SUBMIT_KYC, formData);
    };

    return {
        submitKyc,
    };
}
