import { CheckCircle, Package, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";

export default function BookingPaymentSuccessPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Header isLoggedIn={true} />

      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border">

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <CheckCircle size={70} className="text-green-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold mb-2">
            Payment Successful
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 mb-6">
            Your parcel booking has been confirmed.  
            You can now track your shipment.
          </p>

          {/* Booking ID */}
          {bookingId && (
            <div className="text-sm text-gray-400 mb-6">
              Booking ID: <span className="font-medium text-gray-600">{bookingId}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3">

            {/* View Booking */}
            <button
              onClick={() => navigate("/bookings")}
              className="flex items-center justify-center gap-2 w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-900 transition"
            >
              <Package size={18} />
              View My Bookings
            </button>

            {/* Create New Booking */}
            <button
              onClick={() => navigate("/booking")}
              className="flex items-center justify-center gap-2 w-full border py-2.5 rounded-lg hover:bg-gray-100 transition"
            >
              <Plus size={18} />
              Create New Booking
            </button>

          </div>
        </div>
      </div>
    </>
  );
}