import { X, CheckCheck } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

interface Props {
    isOpen: boolean;
    notifications: Notification[];
    onClose: () => void;
    loading: boolean;
    hasMore: boolean;
    loadMoreNotifications: () => void;
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}

const NotificationModal = ({
    isOpen,
    notifications,
    onClose,
    onMarkAsRead,
    onMarkAllAsRead,
    loading,
    hasMore,
    loadMoreNotifications
}: Props) => {

    const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

    const unreadNotifications = useMemo(
        () => notifications.filter((n) => !n.isRead),
        [notifications]
    );
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {

        const el = scrollRef.current;

        if (!el || loading || !hasMore) return;

        const reachedBottom =
            el.scrollHeight - el.scrollTop <= el.clientHeight + 50;

        if (reachedBottom) {
            loadMoreNotifications();
        }
    };

    const filteredNotifications =
        activeTab === "unread"
            ? unreadNotifications
            : notifications;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 w-[420px] max-w-[95vw] bg-white rounded-3xl shadow-2xl border z-50 overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-start justify-between p-4 border-b">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Notification
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                            {unreadNotifications.length > 0
                                ? `${unreadNotifications.length} unread notifications`
                                : "No unread notifications"}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab("unread")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${activeTab === "unread"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Unread ({unreadNotifications.length})
                        </button>

                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${activeTab === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            All
                        </button>
                    </div>

                    {unreadNotifications.length > 0 && (
                        <button
                            onClick={onMarkAllAsRead}
                            className="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-lg"
                        >
                            <CheckCheck size={18} className="text-gray-700" />
                        </button>
                    )}
                </div>

                {/* Notifications */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="max-h-[420px] overflow-y-auto px-3 pb-3 space-y-3"
                >

                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            No notifications found
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="border rounded-xl p-3 hover:shadow-md transition bg-white"
                            >
                                <div className="flex justify-between items-start gap-3">
                                    <h3 className="font-semibold text-gray-800 text-xs">
                                        {notification.title}
                                    </h3>

                                    <span className="text-[11px] text-gray-400 whitespace-nowrap">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                <p className="text-gray-600 mt-2 text-sm leading-5">
                                    {notification.message}
                                </p>

                                {/* Show only in unread tab */}
                                {activeTab === "unread" && !notification.isRead && (
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => onMarkAsRead(notification.id)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm"
                                        >
                                            Mark as Read
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                    {loading && (
                        <div className="py-3 text-center text-xs text-gray-400">
                            Loading...
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default NotificationModal;