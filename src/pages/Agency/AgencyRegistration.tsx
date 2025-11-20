import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { API_AUTH } from '../../constants/apiRoutes';
import { ROLES } from '../../constants/types/roles';
import RegistrationForm from '../../components/Forms/RegistrationForm';


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


const AgencyRegistration = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    async function handleRegistration(values: RegistrationFormValues) {

        try {
            const response = await axiosInstance.post(API_AUTH.SEND_OTP,values)
            if (response.data?.success) {

                const otpData: OtpMeta = {
                    email: response.data.email,
                    role: response.data.role,
                    expiresAt: response.data.expiresAt,
                };
                localStorage.setItem("otpMeta", JSON.stringify(otpData));
                toast.success(response.data?.message)
                navigate("/verify-otp");
            } else {
                toast.error(response.data?.error);
            }

        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.response.data?.error || "Something went wrong!");
        }
    }

    return (
        <div><RegistrationForm title='Agency Registarion' onSubmit={handleRegistration} role={ROLES.AGENCY} /></div>
    )
}

export default AgencyRegistration