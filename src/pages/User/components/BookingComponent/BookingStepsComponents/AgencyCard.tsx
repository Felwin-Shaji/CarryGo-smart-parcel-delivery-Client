import { FaBuilding } from "react-icons/fa6";
import type { getServiceableHubWithAgencyDTO } from "../../../../../constants_Types/types/User/Booking/bookingResponse.dto";

interface Props {
    agency: getServiceableHubWithAgencyDTO;
    selected: boolean;
    onSelect: () => void;
}

import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

export const AgencyCard = ({ agency, selected, onSelect }: Props) => {
    return (
        <div
            onClick={onSelect}
className={`bg-white border rounded-xl p-5 cursor-pointer flex justify-between 
transition hover:shadow-sm 
${selected ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"}`}>

            {/* LEFT ICON */}
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <FaBuilding />
            </div>

            {/* CENTER CONTENT */}
            <div className="flex-1">

                {/* TITLE */}
                <h3 className="font-semibold text-lg text-gray-800">
                    {agency.agency.name}
                </h3>

                {/* STATS */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">

                    <span>
                        % {agency.agency.commissionRate} commission
                    </span>

                    <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        4.8
                    </span>

                    <span>5430 deliveries</span>
                </div>

                {/* HUBS */}
                <div className="grid grid-cols-2 gap-12 mt-5">

                    {/* FROM HUB */}
                    <div>

                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">
                            FROM HUB
                        </p>

                        <p className="font-medium flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400 text-xs" />
                            {agency.fromHub.hubName}
                        </p>

                        <p className="text-xs text-gray-600">
                            {agency.fromHub.address?.city},{" "}
                            {agency.fromHub.address?.state} -{" "}
                            {agency.fromHub.address?.pincode}
                        </p>

                    </div>

                    {/* TO HUB */}
                    <div>

                        <p className="text-xs text-green-600 font-semibold mb-1">
                            TO HUB
                        </p>

                        <p className="font-medium flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400 text-xs" />
                            {agency.toHub.hubName}
                        </p>

                        <p className="text-xs text-gray-600">
                            {agency.toHub.address?.city},{" "}
                            {agency.toHub.address?.state} -{" "}
                            {agency.toHub.address?.pincode}
                        </p>

                    </div>

                </div>

            </div>

            {/* RADIO */}
            <div className="pt-2">
                <input type="radio" checked={selected} readOnly />
            </div>

        </div>
    );
};