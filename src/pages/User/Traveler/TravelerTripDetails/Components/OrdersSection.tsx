import { OrderCard } from "./OrderCard";
import type { TravelerActionStatus, TripOrderUI } from "../../../../../constants_Types/types/User/Traveler/TravelerType";
import { useNavigate } from "react-router-dom";

type OrdersSectionProps = {
    orders: TripOrderUI[];
    isExpired?: boolean;
    onStatusUpdate: (orderId: string, status: TravelerActionStatus) => void;
};

export const OrdersSection = ({ orders, isExpired, onStatusUpdate }: OrdersSectionProps) => {
    return (
        <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <h3 className="font-semibold mb-1">Orders</h3>
            <p className="text-xs text-gray-500 mb-4">
                {orders.length} orders on this trip
            </p>

            <OrderList
                orders={orders}
                isExpired={isExpired}
                onStatusUpdate={onStatusUpdate}
            />

        </div>
    );
};

type OrderListProps = {
    orders: TripOrderUI[];
    isExpired?: boolean;
    onStatusUpdate: (orderId: string, status: TravelerActionStatus) => void;
};

function OrderList({ orders, isExpired, onStatusUpdate }: OrderListProps) {
    const navigate = useNavigate()

    if (isExpired && orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-xl text-center">

                <p className="text-sm font-semibold text-gray-800 mb-1">
                    No Parcels This Time
                </p>

                <p className="text-xs text-gray-500 mb-4 max-w-xs">
                    This trip didn’t receive any parcel requests. Try planning your next trip earlier or choose a high-demand route to increase your chances.
                </p>

                <button onClick={() => navigate('/traveler/request')}
                    className="text-sm px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                    Plan Next Trip
                </button>

            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 border border-dashed rounded-xl text-gray-500">

                <p className="text-sm">
                    No parcels assigned yet
                </p>

            </div>
        );
    }

    // LIST
    return (
        <div className="flex flex-col gap-3">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} onStatusUpdate={onStatusUpdate} />
            ))}
        </div>
    );
}