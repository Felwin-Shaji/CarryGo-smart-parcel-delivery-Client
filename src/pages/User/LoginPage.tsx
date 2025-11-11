import toast from "react-hot-toast";
import LoginForm from "../../components/LoginForm";
import { ROLES } from "../../types/roles";
import { useAxios } from "../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { login } from "../../store/Slice/authSlice";
import { useNavigate } from "react-router-dom";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosInstance = useAxios()


  const handleLogin = async (data: { email: string, password: string, role: string }) => {
    console.log("Logging in with:", data.email, data.password);
    try {
      const response = await axiosInstance.post(`${BASE_URL}/api/user/login`, data);

      if (response.data?.success) {
        toast.success(response.data.message || "Login successfully completed");
        dispatch(login(response.data))
        navigate("/home");
      }

    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.response.data?.error || "Login failed!");
    }
  };

  return <LoginForm title="User Login" onSubmit={handleLogin} role={ROLES.USER} />;
};

export default LoginPage;
