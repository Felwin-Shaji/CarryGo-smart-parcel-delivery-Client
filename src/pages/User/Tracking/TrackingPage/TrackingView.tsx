import type { ParcelTrackingDTO } from "../../../../constants_Types/types/User/Booking/ParcelTracking";
import CurrentStatusCard from "./components/CurrentStatusCard";
import RouteProgress from "./components/RouteProgress";
import ShipmentDetails from "./components/ShipmentDetails";
import TrackingHeader from "./components/TrackingHeader";
import TrackingTimeline from "./components/TrackingTimeline";


interface Props {
  data: ParcelTrackingDTO;
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