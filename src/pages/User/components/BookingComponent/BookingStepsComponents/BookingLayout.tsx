interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

const BookingLayout = ({ left, right }: Props) => {
  return (
    <>

      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">

          {/* Steps */}
          <div className="flex items-center gap-3 text-sm">

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <span>Location</span>
            </div>

            <div className="h-[2px] w-10 bg-yellow-400" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                ✓
              </div>
              <span>Service</span>
            </div>

            <div className="h-[2px] w-10 bg-yellow-400" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-white flex items-center justify-center text-xs">
                3
              </div>
              <span className="font-medium">Package</span>
            </div>

            <div className="h-[2px] w-10 bg-gray-200" />

            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-7 h-7 rounded-full border flex items-center justify-center text-xs">
                4
              </div>
              <span>Review</span>
            </div>

          </div>

          <p className="text-xs text-gray-500">
            STEP 3 OF 4
          </p>
        </div>

        <h2 className="text-xl font-semibold">
          Package Details
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Tell us about the package you want to send so we can calculate pricing accurately.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">

        {/* LEFT CONTENT */}
        <div className="col-span-8 space-y-6">
          {left}
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-4">
          <div className="sticky top-24">
            {right}
          </div>
        </div>

      </div>
    </>
  );
};

export default BookingLayout;