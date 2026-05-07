import AlertsBanner from "./AlertsBanner";
import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import DeliveriesChart from "./DeliveriesChart";
import SalesTable from "./SalesTable";
import ExportActions from "./ExportActions";
import { useAgencyDashboard } from "../../../../Services/Agency/AgencyDashboard/useAgencyDashboard";
import DashboardFilters from "./DashboardFilters";


const AgencyDashboardPage = () => {
    const {
        dashboard,
        salesChart,
        deliveriesChart,
        report,
        loading,
        handleExport,
        setFilters,
        setPage,
    } = useAgencyDashboard();

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-5 lg:px-6">
            <div className="space-y-5">

                <AlertsBanner alerts={dashboard?.alerts || []} />

                <DashboardFilters onChange={setFilters} />

                <StatsCards stats={dashboard?.stats} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    <RevenueChart data={salesChart} />

                    <DeliveriesChart data={deliveriesChart} />
                </div>

                <div
                    className="
                        rounded-2xl
                        border border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                        space-y-5
                    "
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                Sales Report
                            </h2>

                            <p className="text-sm text-slate-500">
                                Monitor recent transactions and revenue
                            </p>
                        </div>

                        <ExportActions onExport={handleExport} />
                    </div>

                    {loading ? (
                        <div className="space-y-3 py-2">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="
                                        h-14
                                        rounded-xl
                                        bg-slate-100
                                        animate-pulse
                                    "
                                />
                            ))}
                        </div>
                    ) : (
                        <SalesTable
                            data={report?.data || []}
                            page={report?.pagination.page || 1}
                            total={report?.pagination.total || 1}
                            limit={report?.pagination.limit || 10}
                            onPageChange={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgencyDashboardPage;