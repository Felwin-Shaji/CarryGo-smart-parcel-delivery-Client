import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { agencyLogin } from '../../store/Slice/agencySlice';
import { useAuth } from '../../Services/Auth';
import OtpVerificationForm from '../../shared/components/Forms/otpVarification';

const AgencyOtpVarification = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { handleVerifyOtp, handleResendOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState<boolean>(false);



  useEffect(() => {
    const storedOtpMeta = localStorage.getItem("otpMeta");

    if (storedOtpMeta) {
      const parsed = JSON.parse(storedOtpMeta);
      setEmail(parsed.email);
      setRole(parsed.role);
      setLoading(false)
    }
  }, []);




  const onVerifyOtp = async (otp: string) => {
    setLoading(true);
    if (!email || !role) {
      toast.error("No email found for verification!");
      return;
    }

    const response = await handleVerifyOtp({ email, otp, role });

    if (!response.success) {
      setLoading(false);
      return
    }

    toast.success(response.message || "OTP verified successfully");

    localStorage.removeItem("otpMeta");

    // Login agency into Redux
    dispatch(agencyLogin({
      agency: response.user,
      accessToken: response.accessToken,
    }));

    navigate("/agency/dashboard");
  };



  const onResendOtp = async () => {
    if (!email || !role) {
      toast.error("No email found for verification!");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await handleResendOtp({ email, role });

      const otpMeta = JSON.stringify({
        email,
        role,
        expiresAt: response.expiresAt,
      });

      localStorage.setItem("otpMeta", otpMeta);

      toast.success("OTP resent successfully!");

      navigate(0)

    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OtpVerificationForm title='Varify your Agency email' onSubmit={onVerifyOtp} onResendOtp={onResendOtp} loading={loading} />
  )
}

export default AgencyOtpVarification