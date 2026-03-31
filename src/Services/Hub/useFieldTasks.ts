// import { useAxios } from "../../hooks/useAxios";
// import { API_HUB, API_WORKER } from "../../constants_Types/apiRoutes";
// import toast from "react-hot-toast";
// import type { GetFieldTasksParams, PaginatedFieldTasks } from "../../constants_Types/types/Logistics/FieldTaskTypes";
// // import type { PickupUI } from "../../pages/Hub/HubPickupPage/FieldTaskPage";

// export const useFieldTasks = () => {
//     const axiosInstance = useAxios();

//     /**
//      * Get all pickup tasks for hub
//      */
//     const getTasks = async (params: GetFieldTasksParams) => {
//         const res = await axiosInstance.get(API_HUB.FIELD_TASKS, { params });

//         return res.data.data as PaginatedFieldTasks;
//     };

//     /**
//      * Assign pickups to available workers (auto assignment)
//      */
//     const assignPickups = async () => {
//         const res = await axiosInstance.post(API_HUB.ASSIGN_PICKUPS);

//         if (res.data.success) {
//             toast.success("Pickups assigned successfully");
//         }

//         return res.data;
//     };

//     /**
//      * Get pickups assigned to a worker
//      */
//     const getWorkerPickups = async () => {
//         const res = await axiosInstance.get(API_WORKER.WORKER_PICKUPS);

//         return res.data.data;
//     };

//     /**
//      * Start pickup (worker action)
//      */
//     const startPickup = async (pickupId: string) => {
//         const res = await axiosInstance.patch(
//             `${API_HUB.FIELD_TASKS}/${pickupId}/start`
//         );

//         if (res.data.success) {
//             toast.success("Pickup started");
//         }

//         return res.data;
//     };

//     return {
//         getTasks,
//         assignPickups,
//         getWorkerPickups,
//         startPickup
//     };
// };