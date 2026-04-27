import type { AgencyParcelTrackingDTO } from "../../../../../constants_Types/types/User/Booking/ParcelTracking";
import CurrentStatusCard from "./CurrentStatusCard";
import RouteProgress from "./RouteProgress";
import ShipmentDetails from "./ShipmentDetails";
import TrackingHeader from "./TrackingHeader";
import TrackingTimeline from "./TrackingTimeline";


interface Props {
  data: AgencyParcelTrackingDTO;
}

export default function TrackingView({ data }: Props) {
  return (
    <>
      <TrackingHeader booking={data.booking} currentStatus={data.currentStatus} />
      <RouteProgress legs={data.route.legs} />

      <div className="grid md:grid-cols-2 gap-6">
        <ShipmentDetails booking={data.booking} shipment={data.shipment} />
        <CurrentStatusCard shipment={data.shipment} />
      </div>

      <TrackingTimeline timeline={data.timeline} />
    </>
  );
}