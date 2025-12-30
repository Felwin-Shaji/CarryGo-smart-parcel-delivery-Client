import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/Slice/userSlice';
import OtpVerificationForm from '../../components/Forms/otpVarification';
import { useAuth } from '../../Services/Auth';



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
    setLoading(true);
    if (!email || !role) {
      navigate('/login')
      toast.error("No email found for verification!");
      return;
    }

    const response = await handleResendOtp({ email, role });
    if (!response.success) return

    const otpMeta = await JSON.stringify({
      email,
      role,
      expiresAt: response.expiresAt,
    })

    localStorage.setItem(
      "otpMeta",
      otpMeta
    );
    setLoading(false);
    navigate(0);
    toast.success("OTP resent successfully!");
  };


  return (
    <div>
      <OtpVerificationForm title='Verify Email' onSubmit={onVerifyOtp} onResendOtp={onResendOtp} email={email} loading={loading} />
    </div>
  )
}

export default OtpVarificationpage