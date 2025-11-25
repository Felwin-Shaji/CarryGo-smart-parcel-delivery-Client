import toast from "react-hot-toast";
import { useAxios } from "../hooks/useAxios";
// import { API_AUTH } from "../constants/apiRoutes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userLogout } from "../store/Slice/userSlice";
// import { ROLES } from "../constants/types/roles";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";
import { agencyLogin, agencyLogout } from "../store/Slice/agencySlice";
import { ROLES, type Roles } from "../constants_Types/types/roles";
import { API_AUTH } from "../constants_Types/apiRoutes";
import { hubLogin, hubLogout } from "../store/Slice/hubSlice";

export const useAuth = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutt = async (role: string, userId: string) => {
    try {
      const response = await axiosInstance.post(API_AUTH.LOGOUT, { role, userId });
      if (response.data.success) {
        if (role === ROLES.USER) {
          dispatch(userLogout());
          navigate("/login");
        } else if (role === ROLES.ADMIN) {
          dispatch(adminLogout());
          navigate("/admin/login");
        } else if (role === ROLES.AGENCY) {

          dispatch(agencyLogout());
          navigate("/agency/login");
        } else if (role === ROLES.HUB) {
          dispatch(hubLogout());
          navigate('/hub/login')
        }
        toast.success("Logged out successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };


  const handleLogin = async (data: { email: string; password: string; role: string }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.LOGIN, data);

      if (response.data?.success) {
        toast.success(response.data.message || "Login successful");

        if (data.role === ROLES.USER) {
          dispatch(userLogin(response.data));
          navigate("/home");
        } else if (data.role === ROLES.ADMIN) {
          dispatch(adminLogin({
            admin: response.data.user,
            accessToken: response.data.accessToken,
          }));
          navigate("/admin/dashboard");
        } else if (data.role === ROLES.AGENCY) {
          dispatch(agencyLogin({
            agency: response.data.user,
            accessToken: response.data.accessToken
          }))
          navigate("/agency/dashboard");
        } else if (data.role === ROLES.HUB) {
          dispatch(hubLogin({
            hub: response.data.user,
            accessToken: response.data.accessToken
          }))
          navigate("hub/dashboard")
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  const handleForgotPassword = async (data: { email: string, role: Roles }) => {
    try {
      const response = await axiosInstance.post(API_AUTH.FORGOT_PASSWORD, data);

      if (response.data?.success) {
        toast.success(response.data.message || "Reset link sent to your email");
        navigate("/reset-link-sent");
      } else {
        toast.error(response.data.message || "Failed to send reset link");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  const handleResetPassword = async (token: string, data: { password: string, role: Roles }) => {
    try {
      const response = await axiosInstance.post(`${API_AUTH.RESET_PASSWORD}/${token}`, data);

      if (response.data?.success) {
        toast.success("Password reset successfully");
        switch (data.role) {
          case ROLES.USER:
            navigate("/login");
            break;
          case ROLES.ADMIN:
            navigate("/admin/login");
            break;
          case ROLES.AGENCY:
            navigate("/agency/login");
            break;
          case ROLES.HUB:
            navigate("/hub/login");
            break;
          case ROLES.WORKER:
            navigate("/worker/login");
            break;
          default:
            navigate("/login");
        }

      } else {
        toast.error(response.data.message || "Reset failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  }

  return { handleLogin, handleLogoutt, handleForgotPassword, handleResetPassword };
};
