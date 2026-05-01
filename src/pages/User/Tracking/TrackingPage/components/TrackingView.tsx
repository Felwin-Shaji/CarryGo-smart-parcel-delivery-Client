import type { AgencyParcelTrackingDTO } from "../../../../../shared/constants_Types/types/User/Booking/ParcelTracking";
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
      <RouteProgress legs={data.route.legs} currentStatus={data.currentStatus.status} />
      <ShipmentDetails booking={data.booking} shipment={data.shipment} />
      <TrackingTimeline timeline={data.timeline} />
    </>
  );
}