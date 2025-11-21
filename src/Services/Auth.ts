import toast from "react-hot-toast";
import { useAxios } from "../hooks/useAxios";
// import { API_AUTH } from "../constants/apiRoutes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userLogout } from "../store/Slice/userSlice";
// import { ROLES } from "../constants/types/roles";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";
import { agencyLogin, agencyLogout } from "../store/Slice/agencySlice";
import { ROLES } from "../constants_Types/types/roles";
import { API_AUTH } from "../constants_Types/apiRoutes";

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
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return { handleLogin, handleLogoutt };
};
