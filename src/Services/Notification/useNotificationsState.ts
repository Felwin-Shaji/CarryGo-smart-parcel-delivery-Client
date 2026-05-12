import { useEffect, useRef, useState } from "react";
import { useNotification, type Notification } from "./useNotification";
import type { Roles } from "../../shared/constants_Types/types/roles";
import { socket } from "../socket";

export const useNotificationsState = (roles: Roles) => {

    const {
        getNotifications,
        markAsRead,
        markAllAsRead,
        getUnreadCount,
    } = useNotification(roles);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const isInitialLoaded = useRef(false);

    // INITIAL LOAD
    useEffect(() => {

        if (isInitialLoaded.current) return;

        isInitialLoaded.current = true;

        loadNotifications(1, true);

        loadUnreadCount();

    }, []);

    useEffect(() => {

        // NEW NOTIFICATION
        socket.on("new-notification", (notification) => {

            setNotifications(prev => [
                notification,
                ...prev,
            ]);

            setUnreadCount(prev => prev + 1);
        });

        // SINGLE READ UPDATE
        socket.on("notification-read", (notificationId) => {

            setNotifications(prev =>
                prev.map(n =>
                    n.id === notificationId
                        ? { ...n, isRead: true }
                        : n
                )
            );

            setUnreadCount(prev => Math.max(prev - 1, 0));
        });

        // MARK ALL READ
        socket.on("notifications-read-all", () => {

            setNotifications(prev =>
                prev.map(n => ({
                    ...n,
                    isRead: true,
                }))
            );

            setUnreadCount(0);
        });

        return () => {

            socket.off("new-notification");
            socket.off("notification-read");
            socket.off("notifications-read-all");

        };

    }, []);

    const loadUnreadCount = async () => {
        const count = await getUnreadCount();
        setUnreadCount(count);
    };

    // LOAD NOTIFICATIONS
    const loadNotifications = async (
        pageNumber: number,
        reset = false
    ) => {

        try {

            setLoading(true);

            const res = await getNotifications(pageNumber, 10);

            if (!res?.data) return;

            const newNotifications = res.data;

            // NO MORE DATA
            if (newNotifications.length < 10) {
                setHasMore(false);
            }

            setNotifications(prev =>
                reset
                    ? newNotifications
                    : [...prev, ...newNotifications]
            );

            setPage(pageNumber);

        } finally {
            setLoading(false);
        }
    };

    // LOAD NEXT PAGE
    const loadMoreNotifications = async () => {

        if (loading || !hasMore) return;

        await loadNotifications(page + 1);

    };

    // MARK SINGLE READ
    const handleMarkAsRead = async (id: string) => {

        const success = await markAsRead(id);

        if (success) {

            setNotifications(prev =>
                prev.map(n =>
                    n.id === id
                        ? { ...n, isRead: true }
                        : n
                )
            );

            setUnreadCount(prev => Math.max(prev - 1, 0));
        }
    };

    // MARK ALL READ
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
        loading,
        hasMore,
        loadMoreNotifications,
        handleMarkAsRead,
        handleMarkAllAsRead,
    };
};