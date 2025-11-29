import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { agencyLogin } from '../../store/Slice/agencySlice';
import OtpVerificationForm from '../../components/Forms/otpVarification';
import { useAuth } from '../../Services/Auth';

const AgencyOtpVarification = () => {
      const navigate = useNavigate()
  const dispatch = useDispatch()

   const { handleVerifyOtp, handleResendOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")


  useEffect(() => {
    const storedOtpMeta = localStorage.getItem("otpMeta");

    if (storedOtpMeta) {
      const parsed = JSON.parse(storedOtpMeta);
      setEmail(parsed.email);
      setRole(parsed.role);
    }
  }, []);




  const onVerifyOtp = async (otp: string) => {
    if (!email || !role) {
      toast.error("No email found for verification!");
      return;
    }

    const response = await handleVerifyOtp({ email, otp, role });

    if (response.success) {
      toast.success(response.message || "OTP verified successfully");

      localStorage.removeItem("otpMeta");

      // Login agency into Redux
      dispatch(agencyLogin({
        agency: response.user,
        accessToken: response.accessToken,
      }));

      navigate("/agency/dashboard");
    }
  };



  const onResendOtp = async () => {
    const response = await handleResendOtp({ email, role });

    if (response.success) {
      localStorage.setItem(
        "otpMeta",
        JSON.stringify({
          email,
          role,
          expiresAt: response.expiresAt,
        })
      );

      toast.success("OTP resent successfully!");
    }
  };

  return (
    <OtpVerificationForm title='Varify your Agency email' onSubmit={onVerifyOtp} onResendOtp={onResendOtp} />
  )
}

export default AgencyOtpVarification