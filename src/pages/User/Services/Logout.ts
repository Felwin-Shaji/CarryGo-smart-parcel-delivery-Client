import toast from "react-hot-toast"
import { useAxios } from "../../../hooks/useAxios";
import { API_AUTH } from "../../../constants/apiRoutes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userlogout } from "../../../store/Slice/userSlice";

export const useAuth = () => {
  const axiosInstance = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (role:string,userId:string)=>{
    try {
        const response = await axiosInstance.post(API_AUTH.LOGOUT,{role,userId});
        if(response.data.success){
            dispatch(userlogout());
            toast.success("Logged out successfully");
            navigate("/login");
        }
    } catch (error:any) {
        toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  return {handleLogout}

}