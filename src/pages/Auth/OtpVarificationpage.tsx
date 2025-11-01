import { useSelector } from 'react-redux';
import OtpVerificationForm from '../../components/otpVarification'
import type { RootState } from '../../store/store';
import toast from 'react-hot-toast';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;


const OtpVarificationpage = () => {
  const email = useSelector((state: RootState) => state.varifyOtp.email);

  const handleOtpVerification = async (otp: string) => {
    try {
      console.log("jdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdjdj")
      const response = await axios.post(`${BASE_URL}/api/user/verify-otp`, { email, otp });
      if(response.data?.success){
        toast.success(response.data?.message)
        console.log("Otp varified successfully");


      }else{
        toast.error(response.data?.message || "somging went reong")
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div>
      <OtpVerificationForm title='Verify Email' onSubmit={handleOtpVerification} email={email} />
    </div>
  )
}

export default OtpVarificationpage