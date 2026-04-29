import { useState } from "react";
import { Eye, MapPin, MessageCircle, Phone, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { TravelerActionStatus, TripOrderUI } from "../../../../../constants_Types/types/User/Traveler/TravelerType";
import TrackingModal from "./TrackingModal";
import { getStatusButtonColor, getStatusColor, STATUS_FLOW, STATUS_LABELS, STATUS_TRANSITIONS } from "../utils/TravelerTripDetailsHelper";
import type { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import ChatModal from "../../../../../components/chat/ChatModal";
import { useChat } from "../../../../../Services/Chat/useChat";

export interface OrderCardProps {
    order: TripOrderUI;
    onStatusUpdate: (id: string, status: TravelerActionStatus) => void;
}

export const OrderCard = ({ order, onStatusUpdate }: OrderCardProps) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showTracking, setShowTracking] = useState(false);

    const { user } = useSelector((state: RootState) => state.userState);
    const { getOrCreateChatId } = useChat();
    const [chatId, setChatId] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);

    const handleOpenChat = async () => {
        const id = await getOrCreateChatId([user?.id!, order.customerDetails.id!], order.id);

        if (!id) return;

        setChatId(id);
        setShowChat(true);
    };


    const currentStatus = order.status as TravelerActionStatus;
    const isTravelerStatus = STATUS_FLOW.includes(currentStatus);
    const nextOptions: TravelerActionStatus[] = isTravelerStatus
        ? STATUS_TRANSITIONS[currentStatus] || []
        : [];

    return (
        <>
            <div
                onClick={() => setIsOpen(prev => !prev)}
                className="bg-white rounded-lg border px-4 py-3 hover:shadow-sm transition cursor-pointer"
            >
                {/* HEADER */}
                <div className={`flex justify-between ${isOpen ? "bg-gray-50 rounded-lg p-2" : ""}`}>

                    <div>
                        <p className="text-sm font-semibold">
                            #{order.id.slice(0, 8)}
                        </p>

                        <p className="text-xs text-gray-500">
                            {order.customerDetails.name} • ₹{order.amount}
                        </p>

                        <p className="text-xs text-gray-400">
                            {order.pickupAddress.city} → {order.deliveryAddress.city}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.replaceAll("_", " ")}
                        </span>

                        <ChevronDown
                            size={16}
                            className={`transition ${isOpen ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>

                {/* EXPANDED */}
                {isOpen && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 border-t pt-3 space-y-2">

                        <p className="text-xs">
                            <span className="font-medium">Pickup:</span> {order.pickupAddress.formattedAddress}
                        </p>

                        <p className="text-xs">
                            <span className="font-medium">Delivery:</span> {order.deliveryAddress.formattedAddress}
                        </p>

                        {/* STATUS TRACKER */}
                        <div className="pt-3">

                            {/* CURRENT STATUS */}
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-500">Status</p>

                                <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100">
                                    {STATUS_LABELS[order.status as TravelerActionStatus] || order.status}
                                </span>
                            </div>

                            {/* ACTION DROPDOWN */}
                            {nextOptions.length === 1 && (
                                <div className="pt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onStatusUpdate(order.id, nextOptions[0]);
                                        }}
                                        className={`
                                            inline-flex items-center gap-2
                                            text-xs font-medium px-3 py-1.5 rounded-md
                                            ${getStatusButtonColor(order.status)}
                                        `}
                                    >
                                        Mark as {STATUS_LABELS[nextOptions[0]]}
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2 pt-2 flex-wrap">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/bookings/${order.id}`);
                                }}
                                className="text-xs border px-2 py-1 rounded"
                            >
                                <Eye size={12} /> View
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowTracking(true);
                                }}
                                className="text-xs border px-2 py-1 rounded"
                            >
                                <MapPin size={12} /> Track
                            </button>

                            <a
                                onClick={(e) => e.stopPropagation()}
                                href={`tel:${order.customerDetails.mobile}`}
                                className="text-xs border px-2 py-1 rounded text-green-600"
                            >
                                <Phone size={12} /> Call
                            </a>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenChat();
                                }}
                                className="text-xs border px-2 py-1 rounded text-blue-600"
                            >
                                <MessageCircle size={12} /> Chat
                            </button>
                        </div>
                    </div>
                )}
            </div >

            {/* ✅ MOVE MODAL OUTSIDE */}
            {showChat && chatId && (
                <ChatModal
                    isOpen={showChat}
                    onClose={() => setShowChat(false)}
                    chatId={chatId}
                    currentUserId={user?.id!}
                    receiverId={order.customerDetails.id!}
                    receiverName={order.customerDetails.name}
                    bookingId={order.id}
                />
            )}
            {showTracking && (
                <TrackingModal
                    order={order}
                    onClose={() => setShowTracking(false)}
                />
            )}
        </>
    );
};