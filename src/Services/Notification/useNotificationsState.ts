// hooks/useNotificationsState.ts

import { useEffect, useState } from "react";
import { useNotification, type Notification } from "./useNotification";
;

export const useNotificationsState = () => {
    const {
        getNotifications,
        markAsRead,
        markAllAsRead,
        getUnreadCount,
    } = useNotification();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Load initial data
    useEffect(() => {
        const load = async () => {
            const res = await getNotifications(1, 10);
            if (res) {
                setNotifications(res.data);
            }

            const count = await getUnreadCount();
            setUnreadCount(count);
        };

        load();
    }, []);

    // Mark one as read
    const handleMarkAsRead = async (id: string) => {
        const success = await markAsRead(id);

        if (success) {
            setNotifications(prev =>
                prev.map(n =>
                    n._id === id
                        ? { ...n, isRead: true } // FIXED
                        : n
                )
            );

            setUnreadCount(prev => Math.max(prev - 1, 0));
        }
    };

    // Mark all as read
    const handleMarkAllAsRead = async () => {
        const success = await markAllAsRead();

        if (success) {
            setNotifications(prev =>
                prev.map(n => ({
                    ...n,
                    isRead: true,
                }))
            );

            setUnreadCount(0);
        }
    };

    return {
        notifications,
        unreadCount,
        handleMarkAsRead,
        handleMarkAllAsRead,
    };
};