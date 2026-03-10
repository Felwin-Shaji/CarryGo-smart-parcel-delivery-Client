import { MapPin } from "lucide-react";
import { ErrorMessage } from "formik";
import type { AddressUI } from "../../../../../context/Booking/Booking.types";
import SectionCard from "./SectionCard";

interface Props {
  startAddress: AddressUI | null;
  endAddress: AddressUI | null;
  openPickup: () => void;
  openDrop: () => void;
}

const RouteSection = ({
  startAddress,
  endAddress,
  openPickup,
  openDrop,
}: Props) => {
  return (
    <SectionCard
      icon={<MapPin size={18} />}
      title="ROUTE DETAILS"
      subtitle="Select your pickup and delivery addresses"
    >
      <div className="grid grid-cols-2 gap-4">

        {/* FROM */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-blue-600 uppercase">
            From *
          </label>

          <div
            onClick={openPickup}
            className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer hover:border-gray-400"
          >
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin size={16} />
              <span>
                {startAddress
                  ? startAddress.formattedAddress
                  : "Select pickup address"}
              </span>
            </div>

            <span className="text-gray-400">›</span>
          </div>

          <ErrorMessage
            name="startAddress"
            component="p"
            className="text-red-500 text-xs"
          />
        </div>

        {/* TO */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-green-600 uppercase">
            To *
          </label>

          <div
            onClick={openDrop}
            className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer hover:border-gray-400"
          >
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin size={16} />
              <span>
                {endAddress
                  ? endAddress.formattedAddress
                  : "Select delivery address"}
              </span>
            </div>

            <span className="text-gray-400">›</span>
          </div>

          <ErrorMessage
            name="endAddress"
            component="p"
            className="text-red-500 text-xs"
          />
        </div>
      </div>
    </SectionCard>
  );
};

export default RouteSection;