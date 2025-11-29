
import { API_ADMIN } from "../constants_Types/apiRoutes";
import type { KYCStatus } from "../constants_Types/types/roles";
import { useAxios } from "../hooks/useAxios"


export const useAdmin = () => {
  const axiosInstance = useAxios();


  /**
 * Fetch all agencies with pagination, search, and sorting support.
 *
 * @param options {{
 *   page?: number;
 *   limit?: number;
 *   search?: string;
 *   sortBy?: string;
 *   sortOrder?: "asc" | "desc";
 * }}
 * @returns Promise<{
 *   success: boolean;
 *   data: any[];
 *   totalPages: number;
 * }>
 */
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



  /**
 * Fetch a single agency by ID.
 *
 * @param id - Agency ID
 * @returns Promise<{ success: boolean; data: any }>
 */
  const getAgencyById = async (id: string) => {
    const res = await axiosInstance.get(`${API_ADMIN.GET_AGENCIES}/${id}`);
    return res.data;
  };



  /**
 * Update an agency's block/unblock status.
 *
 * @param id - Agency ID
 * @param isBlocked - New block status (true = block, false = unblock)
 * @returns Promise<{ success: boolean; message: string }>
 */
  const updateAgencyStatus = async (id: string, isBlocked: boolean) => {
    const res = await axiosInstance.patch(`${API_ADMIN.GET_AGENCIES}/${id}/status`, {
      isBlocked,
    });
    return res.data
  }




  /**
 * 
 * @param id userId
 * @param status "active" | "blocked"
 * @returns 
 */
  const updateUserStatus = async (id: string, isBlocked: boolean) => {
    const res = await axiosInstance.patch(`${API_ADMIN.GET_USERS}/${id}/status`, {
      isBlocked,
    });

    return res.data;
  };




  /**
   * Update an agency's block/unblock status.
   *
   * @param id - Agency ID
   * @param isBlocked - New block status (true = block, false = unblock)
   * @returns Promise<{ success: boolean; message: string }>
   */
  const updateAgencyKycStatus = async (id: string, status: KYCStatus) => {
    const res = await axiosInstance.patch(`${API_ADMIN.GET_AGENCIES}/${id}/kyc-status`, { status });
    return res.data;
  };



  /**
  * Fetch all users with pagination, search, and sorting support.
  *
  * @param options {{
  *   page?: number;
  *   limit?: number;
  *   search?: string;
  *   sortBy?: string;
  *   sortOrder?: "asc" | "desc";
  * }}
  * @returns Promise<{
  *   success: boolean;
  *   data: any[];
  *   totalPages: number;
  * }>
  */
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
    updateUserStatus,
    updateAgencyKycStatus,
    getAllUsers,
    updateAgencyStatus
  };


};
