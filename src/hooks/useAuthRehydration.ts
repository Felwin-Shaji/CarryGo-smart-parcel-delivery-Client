import { useDispatch } from "react-redux"
import { useAxios } from "./useAxios";
import { useEffect } from "react";
import { userLogin, userLogout } from "../store/Slice/userSlice";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";
import { agencyLogin, agencyLogout } from "../store/Slice/agencySlice";
import { ROLES, type Roles } from "../shared/constants_Types/types/roles";
import { API_AUTH } from "../shared/constants_Types/apiRoutes";
import { hubLogin, hubLogout } from "../store/Slice/hubSlice";
import { workerLogin, workerLogout } from "../store/Slice/workerSlice";
import { refreshEnd } from "../store/Slice/authMetaSlice";
import { socket } from "../Services/socket";


export const useAuthRehydration = (role: Roles) => {
    const dispatch = useDispatch();
    const axiosInstance = useAxios();

    useEffect(() => {
        const refreshSession = async () => {
            try {
                const response = await axiosInstance.post(API_AUTH.REFRESH_TOKEN, { role });

                if (response.data?.success) {
                    const { user, accessToken } = response.data.data;

                    // Attach auth to socket
                    socket.auth = {
                        token: accessToken,
                    };

                    //  Connect only if not already connected
                    if (!socket.connected) {
                        socket.connect();
                        console.log(" Socket connected:", socket.id);
                    }


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
                            if (socket.connected) {
                                socket.disconnect();
                                console.log("Socket disconnected");
                            }
                            break;
                    }
                } else {
                    dispatch(userLogout());
                    dispatch(adminLogout());
                    dispatch(agencyLogout())
                    dispatch(hubLogout());
                    dispatch(workerLogout());
                    if (socket.connected) {
                        socket.disconnect();
                        console.log(" Socket disconnected");
                    }
                }
            } catch (error) {
                dispatch(userLogout());
                dispatch(adminLogout());
                dispatch(agencyLogout());
                dispatch(hubLogout());
                dispatch(workerLogout());
                if (socket.connected) {
                    socket.disconnect();
                    console.log(" Socket disconnected");
                }
            } finally {
                dispatch(refreshEnd());
            }
        }

        refreshSession();
    }, [dispatch, axiosInstance])

}