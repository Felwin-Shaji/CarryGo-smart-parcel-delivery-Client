import RegistrationForm from '../../components/RegistrationForm'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../types/roles';
import { useAxios } from '../../hooks/useAxios';
import { API_AUTH } from '../../constants/apiRoutes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface RegistrationFormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
}

export interface OtpMeta {
    email: string;
    role: string;
    expiresAt: string;
}


const RegistrationPage = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    async function handleRegistration(values: RegistrationFormValues) {

        try {
            console.log(BASE_URL)
            const response = await axiosInstance.post(API_AUTH.SEND_OTP,values)
            console.log(response, "................send-otp response............");
            if (response.data?.success) {

                const otpData: OtpMeta = {
                    email: response.data.email,
                    role: response.data.role,
                    expiresAt: response.data.expiresAt,
                };
                localStorage.setItem("otpMeta", JSON.stringify(otpData));
                toast.success(response.data?.message)
                navigate("/varify-otp");
            } else {
                toast.error(response.data?.error);
            }

        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.response.data?.error || "Something went wrong!");
        }
    }

    return (
        <div><RegistrationForm title='User Registarion' onSubmit={handleRegistration} role={ROLES.USER} /></div>
    )
}

export default RegistrationPage

