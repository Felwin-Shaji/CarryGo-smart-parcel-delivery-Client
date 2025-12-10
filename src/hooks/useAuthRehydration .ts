import { useDispatch } from "react-redux"
import { useAxios } from "./useAxios";
import { useEffect, useState } from "react";
import { userLogin, userLogout } from "../store/Slice/userSlice";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";
import { agencyLogin, agencyLogout } from "../store/Slice/agencySlice";
import { ROLES, type Roles } from "../constants_Types/types/roles";
import { API_AUTH } from "../constants_Types/apiRoutes";
import { hubLogin, hubLogout } from "../store/Slice/hubSlice";
import { workerLogin, workerLogout } from "../store/Slice/workerSlice";


export const useAuthRehydration = (role: Roles) => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshSession = async () => {
            try {
                const response = await axiosInstance.post(API_AUTH.REFRESH_TOKEN, { role });

                if (response.data?.success) {
                    const { user, accessToken } = response.data;

                    switch (user.role) {
                        case ROLES.USER:
                            dispatch(userLogin({ user, accessToken }));
                            break;
                        case ROLES.ADMIN:
                            dispatch(adminLogin({ admin: user, accessToken }));
                            break;
                        case ROLES.AGENCY:
                            dispatch(agencyLogin({ agency: user, accessToken }));
                            break;
                        case ROLES.HUB:
                            dispatch(hubLogin({ hub: user, accessToken }));
                            break;
                        case ROLES.WORKER:
                            dispatch(workerLogin({ worker: user, accessToken }))
                            break;
                        default:
                            dispatch(userLogout());
                            dispatch(adminLogout());
                            dispatch(agencyLogout())
                            dispatch(hubLogout());
                            dispatch(workerLogout());
                            break;
                    }

                } else {
                    dispatch(userLogout());
                    dispatch(adminLogout());
                    dispatch(agencyLogout())
                    dispatch(hubLogout());
                    dispatch(workerLogout());

                }

            } catch (error) {
                dispatch(userLogout());
                dispatch(adminLogout());
                dispatch(agencyLogout());
                dispatch(hubLogout());
                dispatch(workerLogout());


            } finally {
                setLoading(false);
            }
        }

        refreshSession();
    }, [dispatch, axiosInstance])

    return loading;
}