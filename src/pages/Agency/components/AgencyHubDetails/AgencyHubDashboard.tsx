import { ROLES } from "../../../../shared/constants_Types/types/roles";
import HubDashboardView from "../../../Hub/components/HubDashboard/HubDashboardView";

export default function AgencyHubDashboard({ hubId }: { hubId: string }) {
  return <HubDashboardView role={ROLES.AGENCY} hubId={hubId} />;
}
