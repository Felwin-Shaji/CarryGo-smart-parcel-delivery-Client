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

    setLoading(true);
    if (!email || !role) {
      navigate('/login')
      toast.error("No email found for verification!");
      return;
    }
    const response = await handleResendOtp({ email, role });

    if (!response.success) return
    localStorage.setItem(
      "otpMeta",
      JSON.stringify({
        email,
        role,
        expiresAt: response.expiresAt,
      })
    );
    setLoading(false);
    navigate(0);
    toast.success("OTP resent successfully!");

  };

  return (
    <OtpVerificationForm title='Varify your Agency email' onSubmit={onVerifyOtp} onResendOtp={onResendOtp} loading={loading} />
  )
}

export default AgencyOtpVarification