import axios from 'axios'
import RegistrationForm from '../../components/RegistrationForm'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../store/Slice/VarifyOtpSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface RegistrationFormValues {
    name: string;
    email: string;
    mobile: string;
    password: string;
}

export interface OtpMeta {
    email: string;
    expiresAt: string; // store as ISO string (from backend)
}


const RegistrationPage = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();

    async function handleRegistration(values: RegistrationFormValues) {
        try {
            console.log(BASE_URL)
            const response = await axios.post((`${BASE_URL}/api/user/send-otp`), values)
            console.log(response, 'kfkfkfkfkfkfkfkfkfkfkfkfkfkfkf');

            if (response.data?.success) {
                const otpData: OtpMeta = {
                    email: response.data.email,
                    expiresAt: response.data.expiresAt,
                };
                localStorage.setItem("otpMeta", JSON.stringify(otpData));

                dispatch(setEmail(values.email))
                toast.success(response.data?.message)
                navigate("/verify-otp");
            } else {
                toast.error(response.data?.message)
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    }

    return (
        <div><RegistrationForm title='User Registarion' onSubmit={handleRegistration} /></div>
    )
}

export default RegistrationPage

