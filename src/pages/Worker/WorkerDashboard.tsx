import { ROLES } from "../../constants_Types/types/roles";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import WorkerDashboardView from "./WorkerDashboard/WorkerDashboardView";

const WorkerDashboardPage = () => {
  return (
    <DashboardProvider role={ROLES.WORKER}>
      <DashboardLayout>
        <WorkerDashboardView />
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default WorkerDashboardPage;