import { useAxios } from "../../hooks/useAxios";
import { getNotificationApi } from "../../shared/constants_Types/apiRoutes";
import type { Roles } from "../../shared/constants_Types/types/roles";

export type Notification = {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

export const NotificationFilter = {
    ALL: "ALL",
    READ: "READ",
    UNREAD: "UNREAD",
} as const;

export type NotificationFilter =
    typeof NotificationFilter[keyof typeof NotificationFilter];

export const useNotification = (role: Roles) => {

    const axiosInstance = useAxios();
    const API = getNotificationApi(role);

    const getNotifications = async (
        page: number = 1,
        limit: number = 10,
        filter: NotificationFilter = NotificationFilter.ALL
    ) => {

        const res = await axiosInstance.get(API.GET_ALL, {
            params: { page, limit, filter },
        });

        return res.data.data

    };

    // Mark single notification as read
    const markAsRead = async (notificationId: string) => {

        const res = await axiosInstance.patch(
            `${API.MARK_AS_READ}/${notificationId}`
        );

        return res.data.success;

    };

    //  Mark all notifications as read
    const markAllAsRead = async () => {

        const res = await axiosInstance.patch(
            API.MARK_ALL_AS_READ
        );

        return res.data.success;
    };

    // Get unread count (for bell badge)
    const getUnreadCount = async () => {

        const res = await axiosInstance.get(
            API.UNREAD_COUNT
        );

        if (res.data.success) {
            return res.data.data.count as number;
        };

        return 0;

    };

    return {
        getNotifications,
        markAsRead,
        markAllAsRead,
        getUnreadCount,
    };
};