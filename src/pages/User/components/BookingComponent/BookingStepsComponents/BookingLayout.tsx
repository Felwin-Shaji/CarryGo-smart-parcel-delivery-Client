interface Props {
  step: number;
  title: string;
  description: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

const steps = ["Location", "Service", "Package", "Review"];

const BookingLayout = ({ step, title, description, left, right }: Props) => {
  return (
    <>
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-5 pt-6">

        <div className="flex items-center justify-between mb-4">

          {/* Step Progress */}
          <div className="flex items-center gap-3 text-sm">

            {steps.map((label, index) => {
              const stepIndex = index + 1;

              const completed = stepIndex < step;
              const active = stepIndex === step;

              return (
                <div key={label} className="flex items-center gap-3">

                  <div className="flex items-center gap-2">

                    {/* Circle */}
                    <div
                      className={`
                        w-7 h-7 rounded-full flex items-center justify-center text-xs
                        ${completed ? "bg-green-500 text-white" : ""}
                        ${active ? "bg-yellow-400 text-white" : ""}
                        ${!completed && !active ? "border text-gray-400" : ""}
                      `}
                    >
                      {completed ? "✓" : stepIndex}
                    </div>

                    <span
                      className={
                        active ? "font-medium text-gray-900" : "text-gray-500"
                      }
                    >
                      {label}
                    </span>

                  </div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div
                      className={`h-[2px] w-10 ${
                        stepIndex < step ? "bg-yellow-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-xs text-gray-500">
            STEP {step} OF {steps.length}
          </p>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="col-span-8 space-y-6">
          {left}
        </div>

        {/* RIGHT */}
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