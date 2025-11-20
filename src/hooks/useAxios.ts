import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAxios = (): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
        headers: {
        }
    });

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {

                if (error.code === "ERR_NETWORK") {
                    toast.error("Cannot connect to the server. Please ensure the backend is running.");
                    return Promise.reject(error);
                }

                const data = error.response?.data as { message?: string } | undefined;
                const status = error.response?.status;

                if (status === 401) {
                    toast.error(data?.message||"Session expired. Please log in again.");
                } else if (status === 403) {
                    toast.error("Access denied. Please check your permissions.");
                } else if (status === 500) {
                    toast.error("Internal server error. Please try again later.");
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