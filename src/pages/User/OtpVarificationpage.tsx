import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store/Slice/userSlice';
import OtpVerificationForm from '../../components/Forms/otpVarification';
import { useAuth } from '../../Services/Auth';


const OtpVarificationpage = () => {
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
      setRole(parsed.role)
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

      if (role === "user") {
        dispatch(userLogin(response));
        navigate("/home");
      } else if (role === "agency") {
        navigate("/agency/login");
      } else {
        navigate("/login");
      }
    }
  };

  const onResendOtp = async () => {
    if (!email || !role) return;

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
    <div>
      <OtpVerificationForm title='Verify Email' onSubmit={onVerifyOtp} onResendOtp={onResendOtp} email={email} />
    </div>
  )
}

export default OtpVarificationpage