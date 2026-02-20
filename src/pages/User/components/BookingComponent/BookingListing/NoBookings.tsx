import { PackagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NoBookings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center mt-28 px-6">
      
      {/* Icon */}
      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <PackagePlus className="text-blue-600" size={48} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">
        No deliveries yet
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 mt-3 max-w-md">
        Ready to send your first package? Book a delivery now and track it in real time with CarryGo.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/booking")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full 
                   shadow-md hover:bg-blue-700 hover:shadow-lg 
                   transition-all duration-200"
      >
        Book a Delivery
      </button>
    </div>
  );
};