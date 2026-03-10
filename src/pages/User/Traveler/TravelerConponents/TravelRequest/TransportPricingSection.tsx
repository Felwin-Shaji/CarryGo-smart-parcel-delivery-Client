import { Field, ErrorMessage } from "formik";
import { Truck } from "lucide-react";
import SectionCard from "./SectionCard";

const TransportPricingSection = () => {
  return (
    <SectionCard
      icon={<Truck size={18} />}
      title="TRANSPORT"
    >
        {/* MODE OF TRANSPORT */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-gray-500">
            Mode of Transport *
          </label>

          <Field
            as="select"
            name="modeOfTransport"
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="">Select transport</option>
            <option value="FLIGHT">Flight</option>
            <option value="TRAIN">Train</option>
            <option value="CAR">Car</option>
            <option value="BUS">Bus</option>
            <option value="BIKE">Bike</option>
          </Field>

          <ErrorMessage
            name="modeOfTransport"
            component="p"
            className="text-red-500 text-xs"
          />
        </div>


      {/* </div> */}
    </SectionCard>
  );
};

export default TransportPricingSection;