import { Package } from "lucide-react";

interface Props {
    type?: "initial" | "not-found";
}

export default function TrackingEmptyState({ type = "initial" }: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Icon */}
            <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Package className="w-10 h-10 text-gray-400" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800">
                {type === "initial"
                    ? "Track Your Parcel"
                    : "No Booking Found"}
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 mt-2 max-w-md">
                {type === "initial"
                    ? "Enter your booking ID above to get real-time updates on your shipment."
                    : "We couldn't find any shipment with that booking ID. Please check and try again."}
            </p>

            {/* Optional hint */}
            {type === "not-found" && (
                <p className="text-sm text-gray-400 mt-3">
                    Tip: Try using a valid booking ID
                </p>
            )}
        </div>
    );
}