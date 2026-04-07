import { X } from "lucide-react";
import type { WorkersBookingDetailsUI } from "../../../../constants_Types/types/Worker/workerShipment";

interface BookingDetailsModalProps {
  booking: WorkersBookingDetailsUI | null;
  onClose: () => void;

  // optional (for future extensibility)
  onUpdateStatus?: (bookingId: string) => void;
}

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleString() : "—";

const currency = (n?: number) =>
  n ? `₹${n.toFixed(2)}` : "—";

/* ---------------- STATUS BADGE ---------------- */
const StatusBadge = ({ status }: { status: string }) => {
  const colors: any = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    IN_TRANSIT: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export const BookingDetailsModal = ({ booking, onClose }: BookingDetailsModalProps) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-gray-50 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-semibold text-lg">
                #{booking.id.slice(-6)}
              </h2>
              <StatusBadge status={booking.status} />
            </div>

            <p className="text-xs text-gray-500">
              {formatDate(booking.createdAt)}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* TOP GRID */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT - ROUTE */}
            <div className="bg-white p-5 rounded-2xl border shadow-sm col-span-2">
              <h3 className="font-semibold mb-4">Route</h3>

              <div className="flex items-start gap-4">

                {/* Timeline Line */}
                <div className="flex flex-col items-center mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="w-[2px] h-10 bg-gray-300" />
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                </div>

                {/* Addresses */}
                <div className="flex flex-col gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-800">
                      Pickup
                    </p>
                    <p className="text-gray-600">
                      {booking.pickupAddress.formattedAddress}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      Delivery
                    </p>
                    <p className="text-gray-600">
                      {booking.deliveryAddress.formattedAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - QUICK INFO */}
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-4">Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Status</span>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="flex justify-between">
                  <span>Payment</span>
                  <StatusBadge status={booking.payment.paymentStatus} />
                </div>

                <div className="flex justify-between">
                  <span>Distance</span>
                  <span>{booking.distanceKm} km</span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">
                    {currency(booking.pricing.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HUB TIMELINE */}
          {booking.logistics?.routeHubs && (
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-4">Hub Journey</h3>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {booking.logistics.routeHubs.map((hub: any) => {
                  const isActive =
                    hub.hubId === booking.logistics?.currentHubId;

                  return (
                    <div
                      key={hub.hubId}
                      className={`min-w-[200px] p-4 rounded-xl border ${
                        isActive
                          ? "bg-blue-50 border-blue-300"
                          : "bg-gray-50"
                      }`}
                    >
                      <p className="font-medium">{hub.hubName}</p>
                      <p className="text-xs text-gray-500">
                        {hub.status}
                      </p>

                      <div className="text-xs mt-2 text-gray-400">
                        <p>Arrived: {formatDate(hub.arrivedAt)}</p>
                        <p>Departed: {formatDate(hub.departedAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* BOTTOM GRID */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* PACKAGE */}
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-3">Package</h3>

              <p className="text-sm">
                {booking.packageDetails.category}
              </p>
              <p className="text-sm text-gray-500">
                {booking.packageDetails.weightKg} kg
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {booking.packageDetails.dimensions.lengthCm} ×{" "}
                {booking.packageDetails.dimensions.widthCm} ×{" "}
                {booking.packageDetails.dimensions.heightCm}
              </p>

              {booking.packageDetails.fragile && (
                <span className="inline-block mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  Fragile
                </span>
              )}
            </div>

            {/* PAYMENT */}
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-3">Payment</h3>

              <p className="text-sm">{booking.payment.gateway}</p>
              <p className="text-sm text-gray-500">
                {booking.payment.paymentMethod}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {formatDate(booking.payment.paidAt)}
              </p>
            </div>

            {/* PARTNER */}
            {booking.partnerSnapshot && (
              <div className="bg-white p-5 rounded-2xl border shadow-sm">
                <h3 className="font-semibold mb-3">Partner</h3>

                <p className="text-sm">
                  {booking.partnerSnapshot.name}
                </p>
                <p className="text-xs text-gray-500">
                  {booking.partnerSnapshot.contact?.phone}
                </p>
              </div>
            )}
          </div>

          {/* TIMELINE */}
          {booking.travelerJourney && (
            <div className="bg-white p-5 rounded-2xl border shadow-sm">
              <h3 className="font-semibold mb-4">Journey Timeline</h3>

              <div className="space-y-3 text-sm">
                <p>Accepted: {formatDate(booking.travelerJourney.acceptedAt)}</p>
                <p>Picked: {formatDate(booking.travelerJourney.pickedUpAt)}</p>
                <p>Delivered: {formatDate(booking.travelerJourney.deliveredAt)}</p>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="border-t bg-white p-4 flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            Close
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};