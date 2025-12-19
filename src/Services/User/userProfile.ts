import { useAxios } from "../../hooks/useAxios";
import { API_USER } from "../../constants_Types/apiRoutes";
import toast from "react-hot-toast";
import type { GetUserProfileDTO } from "../../constants_Types/types/User/user.dto";

export const useUserProfile = () => {
    const axiosInstance = useAxios();
    // const navigate = useNavigate(); 

    const getUserProfile = async () => {
        try {
            const res = await axiosInstance.get(API_USER.GET_PROFILE);

            toast.success(res.data.message)

            return res.data.data as GetUserProfileDTO
            
        } catch (error: unknown) {
            toast.error("Profile fetch failed ")
        }
    };


    return {
        getUserProfile
    }
}