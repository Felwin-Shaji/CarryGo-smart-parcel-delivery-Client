import toast from "react-hot-toast";
import { API_AGENCY } from "../../constants_Types/apiRoutes";
import { useAxios } from "../../hooks/useAxios"

import { useNavigate } from "react-router-dom";
import type { AddHubPayload } from "../../pages/Agency/AgencyAddHubs";



export const useAgency = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    // const addNewHub = async (values: AddHubPayload) => {

    //     try {
    //         const res = await axiosInstance.post(API_AGENCY.ADD_NEW_HUB, values,
    //             { headers: { "Content-Type": "multipart/form-data" } }
    //         );

    //         if (res.data.success) {
    //             toast.success(res.data.message || "hub added success fully");
    //             navigate('/agency/hubs')
    //         }

    //     } catch (error: any) {
    //         toast.error(error.response?.data?.message || "Login failed!");
    //     }

    // }
    // return { addNewHub }
}