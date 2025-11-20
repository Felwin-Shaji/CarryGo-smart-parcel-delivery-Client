import { API_ADMIN } from "../constants/apiRoutes"
import { useAxios } from "../hooks/useAxios"
import type { KYCStatus } from "../constants/types/roles";
// import type { KYCStatus } from "../context/types/roles";

export const useAdmin = () => {
  const axiosInstance = useAxios();


  const getAllAgencies = async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "",
    sortOrder = "asc",
  }) => {
    const res = await axiosInstance.get(API_ADMIN.GET_AGENCIES, {
      params: { page, limit, search, sortBy, sortOrder },
    });
    return res.data;
  };

  const getAgencyById = async (id: string) => {
    const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCIES}/${id}`);
    return res.data;
  };


/**
 * 
 * @param id 
 * @param status 
 * @returns 
 */
  const updateAgencyKycStatus = async (id: string, status: KYCStatus) => {
    const res = await axiosInstance.patch(`${API_ADMIN.GET_AGENCIES}/${id}/kyc-status`, { status });
    return res.data;
  };


  const getAllUsers = async ({
    page = 1,
    limit = 10,
    search = "",
    sortBy = "",
    sortOrder = "asc",
  }) => {
    const res = await axiosInstance.get(API_ADMIN.GET_USERS, {
      params: { page, limit, search, sortBy, sortOrder },
    });

    return res.data;
  };

  return {
    getAllAgencies,
    getAgencyById,
    updateAgencyKycStatus,
    getAllUsers
  };


};
