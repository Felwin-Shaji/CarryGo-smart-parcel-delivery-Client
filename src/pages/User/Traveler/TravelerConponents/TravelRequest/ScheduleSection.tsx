import { Field, ErrorMessage } from "formik";
import { Calendar } from "lucide-react";
import SectionCard from "./SectionCard";

const ScheduleSection = () => {
  return (
    <SectionCard
      icon={<Calendar size={18} />}
      title="TRAVEL SCHEDULE"
      subtitle="When are you traveling?"
    >
      <div className="grid grid-cols-2 gap-4">

        {/* Departure */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-gray-500">
            Departure Date & Time *
          </label>

          <Field
            type="datetime-local"
            name="departureAt"
            className="w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <ErrorMessage
            name="departureAt"
            component="p"
            className="text-red-500 text-xs"
          />
        </div>

        {/* Arrival */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-gray-500">
            Arrival Date & Time (Optional)
          </label>

          <Field
            type="datetime-local"
            name="arrivalAt"
            className="w-full border rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <ErrorMessage
            name="arrivalAt"
            component="p"
            className="text-red-500 text-xs"
          />
        </div>

      </div>
    </SectionCard>
  );
};

export default ScheduleSection;