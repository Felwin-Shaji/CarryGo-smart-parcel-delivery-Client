import toast from "react-hot-toast";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { API_AGENCY } from "../../constants_Types/apiRoutes";
import type { AddHubPayload } from "../../pages/Agency/AgencyAddHubs";
import type { HubOtpMeta } from "../../pages/Agency/components/AddHubComponents/Step1BasicInfo";


export const useAgencyAddHub = () => {

    const axiosInstance = useAxios();
    const navigate = useNavigate();

    /**
    * Step 0: Check if temp hub already exists
    * @param values (email)
    * @returns {{
    * { exists: boolean,
    *  tempHubId: string,
    *  status: string }
    * }}
    */
    const checkTempStatus = async (email: string) => {
        try {
            const res = await axiosInstance.get(
                `${API_AGENCY.HUB_TEMP_STATUS}?email=${email}`
            );

            return res.data;

        } catch (error: any) {
            return { exists: false };
        }
    };



    /**
     * Step 1: Create temporary hub and send OTP
     *
     * @param values - Basic hub details (name, email, mobile,role)
     * @returns {{ 
     *  success: boolean; 
     *  tempHubId: string 
     *  }}
     */
    const tempRegister = async (values: AddHubPayload) => {
        try {
            const res = await axiosInstance.post(API_AGENCY.HUB_TEMP_REGISTER, values);
            let otpHubMeta: HubOtpMeta = {
                email: res.data.email,
                expiresAt: res.data.expiresAt,
                role: "hub",
                tempHubId: res.data.tempHubId
            }

            localStorage.setItem("otpHubMeta", JSON.stringify(otpHubMeta));

            toast.success(res.data.message || "OTP sent to hub email");

            return {
                success: true,
                tempHubId: res.data.tempHubId,
            };

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
            return { success: false, tempHubId: null };
        }
    };



    /**
     * Step 2: Verify OTP
     *
     * @param email - Hub email used for registration
     * @param tempHubId - Temporary hub ID received from step 1
     * @param otp - 4-digit OTP entered by user
     * @returns {Promise<boolean>} true if OTP is valid
     */
    const verifyOtp = async (email: string, tempHubId: string | null, otp: string) => {
        try {
            const res = await axiosInstance.post(API_AGENCY.HUB_VERIFY_OTP, {
                email,
                tempHubId,
                otp
            });

            toast.success(res.data.message || "OTP sent to hub email");
            return res.data.success;

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid OTP");
            return false;
        }
    };




    /**
     * Step 2: Resend OTP
     *
     * @param email - Hub email used for registration
     * @returns {{ success: boolean; expiresAt: string | null }}
     */
    const resendOtp = async (email: string) => {
        try {
            const res = await axiosInstance.post(API_AGENCY.HUB_RESEND_OTP, { email });

            toast.success("OTP resent successfully");

            return {
                success: true,
                expiresAt: res.data.expiresAt,
            };

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to resend OTP");
            return { success: false, expiresAt: null };
        }
    };




    /**
     * Step 4: Final registration
     *
     * @param formData - All hub details including image
     * @param tempHubId - Temporary hub ID from step 1
     * @returns {Promise<boolean>} true if hub registration is completed
     */
    const finalRegister = async (formData: AddHubPayload, tempHubId: string | null) => {

        try {
            const fd = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (key === "verificationImage" && value instanceof File) {
                    fd.append("verificationImage", value);
                } else {
                    fd.append(key, value?.toString() ?? "");
                }
            });

            if(!tempHubId) return
            fd.append("tempHubId", tempHubId ?? "");

            await axiosInstance.post(
                API_AGENCY.ADD_NEW_HUB,
                fd,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("Hub created successfully!");
            navigate("/agency/hubs");

            return true;

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create hub");
            return false;
        }
    };

    return {
        checkTempStatus,
        tempRegister,
        verifyOtp,
        resendOtp,
        finalRegister,
    };
};
