import { MapPin, User, Truck, Phone, MessageCircle } from "lucide-react";
import type { TravelerParcelTrackingDTO } from "../../../../../constants_Types/types/User/Booking/ParcelTracking";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../../store/store";
import ChatModal from "../../../../../components/chat/ChatModal";
import { useChat } from "../../../../../Services/Chat/useChat";

interface Props {
    data: TravelerParcelTrackingDTO;
}

const steps = [
    "PAID_PENDING_PICKUP",
    "READY_FOR_PICKUP",
    "PICKUP_STARTED",
    "IN_TRANSIT",
    "DELIVERED",
];

export default function TravelerTrackingView({ data }: Props) {
    const { booking, traveler, currentStatus, trip } = data;

    const { user } = useSelector((state: RootState) => state.userState);
    const { getOrCreateChatId } = useChat();
    const [chatId, setChatId] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);

    const normalizedStatus = booking.status
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_");

    const statusMap: Record<string, number> = {
        PAID_PENDING_PICKUP: 0,
        READY_FOR_PICKUP: 1,
        PICKUP_STARTED: 2,
        IN_TRANSIT: 3,
        DELIVERED: 4,
    };

    const currentStepIndex =
        statusMap[normalizedStatus] ?? 0;

    const handleOpenChat = async () => {
        const id = await getOrCreateChatId([user?.id!, traveler.id], booking.id);

        if (!id) return;

        setChatId(id);
        setShowChat(true);
    };

    return (
        <div className="space-y-6">

            {/* 🔵 STATUS HEADER */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">

                {/* subtle background glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

                {/* top section */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs uppercase tracking-wide opacity-80">
                            Tracking ID
                        </p>
                        <h2 className="text-lg font-semibold tracking-wide">
                            {booking.bookingId}
                        </h2>
                    </div>

                    {/* status badge */}
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 backdrop-blur">
                        {booking.status.replaceAll("_", " ")}
                    </span>
                </div>

                {/* divider */}
                <div className="my-4 h-[1px] bg-white/20" />

                {/* status info */}
                <div>
                    <h3 className="text-2xl font-bold capitalize">
                        {currentStatus.status.replaceAll("_", " ").toLowerCase()}
                    </h3>
                    <p className="text-sm opacity-90 mt-1">
                        {currentStatus.message}
                    </p>
                </div>

            </div>

            {/* 🟢 PROGRESS STEPPER */}
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="relative">

                    {/* 🔵 Background Line */}
                    <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded" />

                    {/* 🔵 Active Progress Line */}
                    <div
                        className="absolute top-4 left-0 h-1 bg-blue-600 rounded transition-all"
                        style={{
                            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                        }}
                    />

                    {/* 🔘 Steps */}
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => {
                            const isActive = index <= currentStepIndex;

                            return (
                                <div key={step} className="flex flex-col items-center w-20 text-center">

                                    <div
                                        className={`w-8 h-8 flex items-center justify-center rounded-full z-10
                ${isActive ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}
              `}
                                    >
                                        ✓
                                    </div>

                                    <p className="text-xs mt-2">
                                        {step}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 📍 ROUTE CARD */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-4">
                <h3 className="font-semibold text-lg">Route</h3>

                <div className="flex items-start gap-3">
                    <MapPin className="text-green-600 mt-1" />
                    <div>
                        <p className="text-sm font-medium">Pickup</p>
                        <p className="text-sm text-gray-600">{booking.from.address}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <MapPin className="text-red-600 mt-1" />
                    <div>
                        <p className="text-sm font-medium">Delivery</p>
                        <p className="text-sm text-gray-600">{booking.to.address}</p>
                    </div>
                </div>
            </div>

            {/* 👤 TRAVELER CARD */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-4">

                {/* Top Section */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="text-blue-600" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold">{traveler.name}</h3>
                        <p className="text-sm text-gray-500">{traveler.email}</p>
                    </div>

                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {traveler.kycStatus}
                    </span>
                </div>

                {/* 🔹 ACTION BUTTONS */}
                <div className="flex items-center gap-2">

                    {/* 📞 Call Button */}
                    {traveler.phone && (
                        <a
                            href={`tel:${traveler.phone}`}
                            className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition"
                        >
                            <Phone size={16} className="text-green-600" />
                        </a>
                    )}

                    {/* 💬 Chat Button */}
                    <button
                        onClick={handleOpenChat}
                        title="Chat"
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                    >
                        <MessageCircle size={16} className="text-blue-600" />
                    </button>

                </div>
            </div>
            {/* 📦 PARCEL CARD */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-3">
                <h3 className="font-semibold text-lg">Parcel</h3>

                <div className="flex justify-between text-sm">
                    <span>Category</span>
                    <span>{booking.package.category}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span>Weight</span>
                    <span>{booking.package.weightKg} kg</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span>Price</span>
                    <span>₹{booking.price}</span>
                </div>

                {booking.package.fragile && (
                    <div className="text-xs text-red-500">⚠ Fragile Item</div>
                )}
            </div>

            {/* 🧭 TRIP SUMMARY */}
            <div className="bg-white rounded-2xl shadow p-5 space-y-2">
                <h3 className="font-semibold text-lg">Trip</h3>

                <p className="text-sm text-gray-600">
                    {trip.fromAddress} → {trip.toAddress}
                </p>

                <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <Truck size={16} /> {trip.transportMode}
                    </span>

                    <span>
                        {new Date(trip.departureAt).toLocaleString()}
                    </span>
                </div>
            </div>
            {showChat && chatId && (
                <ChatModal
                    isOpen={showChat}
                    onClose={() => setShowChat(false)}
                    chatId={chatId}
                    currentUserId={user?.id!}
                    receiverId={traveler?.id!}
                    receiverName={traveler.name}
                    bookingId={data.booking.id}
                />
            )}
        </div>
    );
}