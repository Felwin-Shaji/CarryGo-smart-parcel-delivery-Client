import React from "react";
import { X, CheckCheck } from "lucide-react";

export type Notification = {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
};

type Props = {
    isOpen: boolean;
    notifications: Notification[];
    onClose: () => void;
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
};

const NotificationModal: React.FC<Props> = ({
    isOpen,
    notifications,
    onClose,
    onMarkAsRead,
    onMarkAllAsRead,
}) => {
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
                <h3 className="font-semibold text-gray-900 text-sm tracking-wide">
                    Notifications
                </h3>

                <div className="flex items-center gap-2">

                    {notifications.length > 0 && (
                        <button
                            onClick={onMarkAllAsRead}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition"
                        >
                            <CheckCheck size={14} />
                            Mark all
                        </button>
                    )}

                    {/* FIXED CLOSE BUTTON */}
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-19 h-8 rounded-full 
                       bg-gray-100 hover:bg-gray-200 
                       text-gray-600 hover:text-gray-900 
                       transition duration-200"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <p className="text-sm">No notifications yet</p>
                    </div>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n._id}
                            onClick={() => onMarkAsRead(n._id)}
                            className={`px-4 py-3 border-b cursor-pointer transition-all duration-200
                ${!n.isRead ? "bg-blue-50" : "bg-white"}
                hover:bg-gray-50`}
                        >
                            <div className="flex justify-between items-start gap-2">

                                <p className="font-medium text-sm text-gray-900 leading-tight">
                                    {n.title}
                                </p>

                                {!n.isRead && (
                                    <span className="h-2 w-2 bg-blue-500 rounded-full mt-1 shrink-0"></span>
                                )}
                            </div>

                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {n.message}
                            </p>

                            <p className="text-[10px] text-gray-400 mt-2">
                                {new Date(n.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationModal;