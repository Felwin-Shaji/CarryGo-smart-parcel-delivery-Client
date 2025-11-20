import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { API_AUTH } from '../../constants/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { agencyLogin } from '../../store/Slice/agencySlice';
import OtpVerificationForm from '../../components/Forms/otpVarification';

const AgencyOtpVarification = () => {
      const navigate = useNavigate()
  const axiosInstance = useAxios();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")



  useEffect(() => {
    const storedOtpMeta = localStorage.getItem("otpMeta");

    if (storedOtpMeta) {
      const parsed = JSON.parse(storedOtpMeta);
      setEmail(parsed.email);
      setRole(parsed.role)
    }
  }, []);


  const handleOtpVerification = async (otp: string) => {
    if (!email || !role) {
      toast.error("No email found for verification!");
      return;
    }

    try {
      const response = await axiosInstance.post(API_AUTH.VERIFY_OTP, { email, otp, role }); ////////////////////////////////////////////////////
            console.log(response)
      if (response.data?.success) {
        toast.success(response.data.message || "OTP verified successfully!");
        localStorage.removeItem("otpMeta");
        dispatch(agencyLogin(response.data));///////////////////////////////////////////////////////////////
        navigate("/home");
      } else {
        toast.error(response.data?.message || "Verification failed.");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axiosInstance.post(API_AUTH.SEND_OTP, { email, role ,isResend:true });
      if (response.data?.success) {
        localStorage.setItem("otpMeta", JSON.stringify({
          email,
          expiresAt: response.data.expiresAt,
        }));
        toast.success("OTP resent successfully!");
      }
    } catch (error) {
      toast.error("Failed to resend OTP!");
    }
  };

  return (
    <OtpVerificationForm title='Varify your Agency email' onSubmit={handleOtpVerification} onResendOtp={handleResendOtp} />
  )
}

export default AgencyOtpVarification