import { useDispatch } from "react-redux"
import { useAxios } from "./useAxios";
import { useEffect, useState } from "react";
import { login, logout } from "../store/Slice/authSlice";

export const useAuthRehydration = () => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshSession = async () => {
            try {
                const response = await axiosInstance.post("/api/user/refresh"); //"/api/auth/refresh"
                console.log(response,'...................ccccccc.cc..............')
                if (response.data?.success) {
                    dispatch(
                        login({
                            user: response.data.user,
                            accessToken: response.data.accessToken
                        })
                    )
                } else {
                    dispatch(logout())
                }

            } catch (error) {
                dispatch(logout())
            }finally {
                setLoading(false)
            }
        }

        refreshSession();
    }, [dispatch, axiosInstance])

    return loading
}