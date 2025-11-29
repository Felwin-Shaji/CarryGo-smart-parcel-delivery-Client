import { useNavigate } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { API_HUB } from "../../constants_Types/apiRoutes"; // change path if needed
import toast from "react-hot-toast";

export const useHubAddWorker = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    /**
     * Step 1: Create temporary worker and send OTP
     *
     * @param values - Basic worker details (name, email, mobile, role:"worker",hubId)
     * @returns {{
     *   success: boolean;
     *   tempWorkerId: string;
     *   expiresAt: string;
     * }}
     */
    const tempRegisterWorker = async (values: {
        name: string;
        email: string;
        mobile: string;
        tempWorkerId: string;
        role: "worker";
    }) => {

        const res = await axiosInstance.post(API_HUB.TEMP_WORKER_REGISTER, values);
        let worketOtpMeta = {
            email: res.data.email,
            expiresAt: res.data.expiresAt,
            role: "worker",
            tempHubId: res.data._id
        }
        if (res.data.success) toast.success(res.data.message || "otp send successfully")
        localStorage.setItem("otpWorkerMeta", JSON.stringify(worketOtpMeta))
        return res.data;
    };



    /**
     * Step 2: Verify OTP for temporary worker
     *
     * @param payload {{
     *   email: string;
     *   tempWorkerId: string | null;
     *   otp: string;
     * }}
     * @returns {boolean} - True if OTP is valid
     */
    const verifyOtp = async (email: string, tempWorkerId: string | null, otp: string,) => {
        const res = await axiosInstance.post(API_HUB.WORKER_VERIFY_OTP, {
            email,
            tempWorkerId,
            otp
        });
        return res.data.success;
    };



    /**
     * Resend OTP to temporary worker
     *
     * @param email - Worker's email
     * @returns {{
     *   success: boolean;
     *   expiresAt: string;
     * }}
     */
    const resendOtp = async (email: string) => {
        const res = await axiosInstance.post(API_HUB.WORKER_RESEND_OTP, { email });
        return res.data;
    };



    /**
     * Step 3: Upload Worker KYC (document + selfie)
     *
     * @param formData - FormData containing:
     *   - idType
     *   - document
     *   - selfie
     *   - tempWorkerId
     *   - email
     * 
     * @returns {{ success: boolean, workerId: string }}
     */
    const uploadKyc = async (formData: FormData) => {
        const res = await axiosInstance.post(API_HUB.WORKER_KYC_UPLOAD, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        // OPTIONAL: Redirect to worker list after success
        if (res.data.success) {
            navigate("/hub/workers");
        }

        return res.data;
    };



    /**
     * Check if temporary worker exists & fetch status
     *
     * @param email - Worker email
     * @returns {{
     *   exists: boolean;
     *   tempWorkerId?: string;
     *   status?: "BASIC-Info" | "OTP-Verified";
     * }}
     */
    const checkTempWorkerStatus = async (email: string) => {
        const res = await axiosInstance.get(API_HUB.CHECK_TEMP_WORKER_STATUS, {
            params: { email }
        });
        return res.data;
    };

    return {
        tempRegisterWorker,
        verifyOtp,
        resendOtp,
        uploadKyc,
        checkTempWorkerStatus,
    };
};
