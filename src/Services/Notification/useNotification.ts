import { useAxios } from "../../hooks/useAxios";
import { API_NOTIFICATION } from "../../shared/constants_Types/apiRoutes";

export type Notification = {
    _id: string;
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

export const useNotification = () => {

    const axiosInstance = useAxios();

    const getNotifications = async (
        page: number = 1,
        limit: number = 10,
        filter: NotificationFilter = NotificationFilter.ALL
    ) => {

        const res = await axiosInstance.get(API_NOTIFICATION.GET_ALL, {
            params: { page, limit, filter },
        });

        return res.data.data

    };

    // Mark single notification as read
    const markAsRead = async (notificationId: string) => {

        const res = await axiosInstance.patch(
            `${API_NOTIFICATION.MARK_AS_READ}/${notificationId}`
        );

        return res.data.success;

    };

    //  Mark all notifications as read
    const markAllAsRead = async () => {

        const res = await axiosInstance.patch(
            API_NOTIFICATION.MARK_ALL_AS_READ
        );

        return res.data.success;
    };

    // Get unread count (for bell badge)
    const getUnreadCount = async () => {

        const res = await axiosInstance.get(
            API_NOTIFICATION.UNREAD_COUNT
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