import { useAxios } from "../../hooks/useAxios";
import { API_USER } from "../../constants_Types/apiRoutes";
import toast from "react-hot-toast";
import type { GetUserProfileDTO,  } from "../../constants_Types/types/User/userResponse.dto";
import type { UserResetPasswordRequestDTO } from "../../constants_Types/types/User/userRequest.dto";

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

    const updateUserProfile = async (data: { name: string; mobile: string }) => {
        const res = await axiosInstance.patch(API_USER.UPDATE_PROFILE, data);

        if (res.data.success) toast.success(res.data.message || "user profile updated successfully");

        return
    }

    const resetUserPassword = async (data:UserResetPasswordRequestDTO)=>{
        const res = await axiosInstance.patch(API_USER.RESET_PASSWORD,data);

        if(res.data.success) toast.success(res.data.message || "Password reset successfully ");

        return
    }

    return {
        getUserProfile,
        updateUserProfile,
        resetUserPassword
    }
}