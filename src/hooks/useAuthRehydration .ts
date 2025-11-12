import { useDispatch } from "react-redux"
import { useAxios } from "./useAxios";
import { useEffect, useState } from "react";
import { login, userlogout } from "../store/Slice/userSlice";
import { API_AUTH } from "../constants/apiRoutes";

export const useAuthRehydration = () => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshSession = async () => {
            try {
                const response = await axiosInstance.post(API_AUTH.REFRESH_TOKEN);
                
                if (response.data?.success) {
                    dispatch(
                        login({
                            user: response.data.user,
                            accessToken: response.data.accessToken
                        })
                    )
                } else {
                    dispatch(userlogout())
                }

            } catch (error) {
                dispatch(userlogout())
            } finally {
                setLoading(false)
            }
        }

        refreshSession();
    }, [dispatch, axiosInstance])

    return loading
}