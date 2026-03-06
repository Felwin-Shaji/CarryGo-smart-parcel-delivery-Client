interface Props {
  pickup?: string;
  delivery?: string;
  partnerSelected?: boolean;
  children?: React.ReactNode;
}

const BookingOverview = ({
  pickup,
  delivery,
  partnerSelected,
  children,
}: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

      <h3 className="text-xs font-semibold tracking-wide text-gray-500 mb-6">
        BOOKING OVERVIEW
      </h3>

      <div className="space-y-6 text-sm">

        {/* PICKUP */}
        <div>
          <p className="text-xs font-semibold text-blue-600 mb-1">
            PICKUP
          </p>
          <p className="text-gray-700 leading-relaxed">
            {pickup || "Not selected"}
          </p>
        </div>

        {/* DELIVERY */}
        <div>
          <p className="text-xs font-semibold text-green-600 mb-1">
            DELIVERY
          </p>
          <p className="text-gray-700 leading-relaxed">
            {delivery || "Not selected"}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-5">

          <p className="text-xs font-semibold text-orange-500 mb-1">
            SELECTED SERVICE
          </p>

          {!partnerSelected && (
            <p className="text-gray-400 text-sm">
              No service selected yet
            </p>
          )}

          {partnerSelected && (
            <p className="text-green-600 font-medium">
              Service Selected
            </p>
          )}

        </div>

      </div>

      {children && (
        <div className="mt-6 border-t border-gray-200 pt-5">
          {children}
        </div>
      )}

    </div>
  );
};

export default BookingOverview;