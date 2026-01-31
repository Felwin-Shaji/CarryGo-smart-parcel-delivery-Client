import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ROLES, type Roles } from "../constants_Types/types/roles";
import { API_AUTH } from "../constants_Types/apiRoutes";
import { useDispatch } from "react-redux";
import { userLogin, userLogout } from "../store/Slice/userSlice";
import { adminLogin, adminLogout } from "../store/Slice/adminSlice";
import { agencyLogin, agencyLogout } from "../store/Slice/agencySlice";
import { hubLogin, hubLogout } from "../store/Slice/hubSlice";
import { workerLogin, workerLogout } from "../store/Slice/workerSlice";

import { refreshStart, refreshEnd } from "../store/Slice/authMetaSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;


export const useAxios = (): AxiosInstance => {
    const dispatch = useDispatch();

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
        headers: {
        }
    });

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {

                if (error.code === "ERR_NETWORK") {
                    toast.error("Cannot connect to the server.");
                    return Promise.reject(error);
                }
                
                const data = error.response?.data as { message?: string } | undefined;
                const status = error.response?.status;
                const originalRequest = error.config as AxiosRequestConfig & {
                    _retry?: boolean;
                };

                if (status === 401 && !originalRequest?._retry) {
                    originalRequest._retry = true;

                    const url = originalRequest?.url ?? "";
                    let role: Roles | null = null;

                    if (url.startsWith("/api/admin")) role = ROLES.ADMIN;
                    else if (url.startsWith("/api/agency")) role = ROLES.AGENCY;
                    else if (url.startsWith("/api/hub")) role = ROLES.HUB;
                    else if (url.startsWith("/api/worker")) role = ROLES.WORKER;
                    else if (url.startsWith("/api/user")) role = ROLES.USER;

                    // START REFRESH (ONLY ONCE)
                    if (!isRefreshing) {
                        isRefreshing = true;
                        dispatch(refreshStart());

                        refreshPromise = axios
                            .post(`${BASE_URL}${API_AUTH.REFRESH_TOKEN}`, { role }, { withCredentials: true })
                            .then((response) => {
                                if (response.data?.success) {
                                    const { user, accessToken } = response.data.data;

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
                                            dispatch(workerLogin({ worker: user, accessToken }));
                                            break;
                                        default:
                                            dispatch(userLogout());
                                            dispatch(adminLogout());
                                            dispatch(agencyLogout());
                                            dispatch(hubLogout());
                                            dispatch(workerLogout());
                                    }
                                } else {
                                    dispatch(userLogout());
                                    dispatch(adminLogout());
                                    dispatch(agencyLogout());
                                    dispatch(hubLogout());
                                    dispatch(workerLogout());
                                }
                            })
                            .catch(() => {
                                dispatch(userLogout());
                                dispatch(adminLogout());
                                dispatch(agencyLogout());
                                dispatch(hubLogout());
                                dispatch(workerLogout());
                            })
                            .finally(() => {
                                isRefreshing = false;
                                dispatch(refreshEnd());
                            });
                    }

                    //WAIT for refresh, then retry
                    await refreshPromise;
                    return axiosInstance(originalRequest);
                } else if (status === 403) {
                    toast.error("Access denied. Please check your permissions.");
                } else if (status === 500) {
                    console.log(data)
                } else if (data?.message) {
                    toast.error(data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
    }, [axiosInstance]);

    return axiosInstance;
}