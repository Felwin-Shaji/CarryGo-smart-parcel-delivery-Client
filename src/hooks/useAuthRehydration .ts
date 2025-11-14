import { useDispatch } from "react-redux"
import { useAxios } from "./useAxios";
import { useEffect, useState } from "react";
import { userLogin, userLogout } from "../store/Slice/userSlice";
import { API_AUTH } from "../constants/apiRoutes";
import { ROLES, type Roles } from "../types/roles";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";

export const useAuthRehydration = (role:Roles) => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshSession = async () => {
            try {
                const response = await axiosInstance.post(API_AUTH.REFRESH_TOKEN,{role});

                console.log(response,"responce from useAuthRehydration")

                if (response.data?.success) {
                    const { user, accessToken } = response.data;

                    switch (user.role) {
                        case ROLES.USER:
                            dispatch(userLogin({ user, accessToken }));
                            break;
                        case ROLES.ADMIN:
                            console.log(user,"responce from useAuthRehydration user")
                            dispatch(adminLogin({ admin: user, accessToken }));
                            break;
                        default:
                            dispatch(userLogout());
                            dispatch(adminLogout());
                            break;
                    }

                } else {
                    dispatch(userLogout());
                    dispatch(adminLogout());
                }

            } catch (error) {
                dispatch(userLogout())
            } finally {
                setLoading(false)
            }
        }

        refreshSession();
    }, [dispatch, axiosInstance])

    return loading;
}