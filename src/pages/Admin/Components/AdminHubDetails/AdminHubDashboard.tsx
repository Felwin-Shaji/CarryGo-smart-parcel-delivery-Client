import { ROLES } from '../../../../shared/constants_Types/types/roles';
import HubDashboardView from '../../../Hub/components/HubDashboard/HubDashboardView';

export const AdminHubDashboard = ({ hubId }: { hubId: string }) => {
    return <HubDashboardView role={ROLES.ADMIN} hubId={hubId} />;
}
