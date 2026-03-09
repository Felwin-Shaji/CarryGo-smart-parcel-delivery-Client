import { XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";

export default function BookingPaymentFailedPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();

  return (
    <>
                <Header isLoggedIn={true} />
    
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">

      <XCircle size={80} className="text-red-500 mb-4" />

      <h1 className="text-2xl font-semibold mb-2">
        Payment Failed
      </h1>

      <p className="text-gray-500 mb-6">
        Something went wrong while processing your payment.
      </p>

      <div className="flex gap-3">

        <button
          onClick={() => navigate(`/booking/${bookingId}/pay`)}
          className="px-5 py-2 bg-black text-white rounded-lg"
          >
          Retry Payment
        </button>

        <button
          onClick={() => navigate("/booking")}
          className="px-5 py-2 border rounded-lg"
        >
          Go to Bookings
        </button>

      </div>

    </div>
          </>
  );
}