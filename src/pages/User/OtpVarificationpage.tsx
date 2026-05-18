import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/Slice/userSlice';
import { useAuth } from '../../Services/Auth';
import OtpVerificationForm from '../../shared/components/Forms/otpVarification';



export interface OtpMeta {
  email: string;
  role: string;
  expiresAt: string;
}

const OtpVarificationpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleVerifyOtp, handleResendOtp } = useAuth();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState<boolean>(false);



  useEffect(() => {
    const storedOtpMeta = localStorage.getItem("otpMeta");

    if (storedOtpMeta) {
      const parsed: OtpMeta = JSON.parse(storedOtpMeta);
      setEmail(parsed.email);
      setRole(parsed.role);
      setLoading(false)
    }
  }, []);


  const onVerifyOtp = async (otp: string) => {
    setLoading(true);
    if (!email || !role) {
      navigate('/login')
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

    if (role === "user") {
      dispatch(userLogin(response));
      navigate("/home");
    } else if (role === "agency") {
      navigate("/agency/login");
    } else {
      navigate("/login");
    }
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
    <div>
      <OtpVerificationForm role='user' title='Verify Email' onSubmit={onVerifyOtp} onResendOtp={onResendOtp} email={email} loading={loading} />
    </div>
  )
}

export default OtpVarificationpage