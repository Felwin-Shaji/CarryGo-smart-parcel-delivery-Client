import toast from "react-hot-toast";
import { API_AGENCY } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export const useResubmitAgencyKyc = () => {

    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const fetchRejectedAgencyKyc = async (agencyId: string) => {
        try {
            const response = await axiosInstance.get(
                `${API_AGENCY.RESUBMIT_AGENCY_KYC}/${agencyId}`
            );
            return response.data;
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch agency KYC data");
            return { success: false };
        }
    };

    const resubmitAgencyKyc = async (formData: FormData) => {
        try {
            toast.loading("Submitting agency KYC...", { id: "kyc-submit" });
            const response = await axiosInstance.put(
                API_AGENCY.RESUBMIT_AGENCY_KYC,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Agency KYC resubmitted successfully!", { id: "kyc-submit" });
            navigate("/agency/dashboard", { replace: true });
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to resubmit agency KYC", { id: "kyc-submit" });
            return { success: false };
        }
    }

    return {
        fetchRejectedAgencyKyc,
        resubmitAgencyKyc
    };
}