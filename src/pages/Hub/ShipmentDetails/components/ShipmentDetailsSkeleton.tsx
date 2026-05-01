import { ROLES } from "../../../../shared/constants_Types/types/roles";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";

export default function ShipmentDetailsSkeleton() {
    return (
        <>
            <DashboardProvider role={ROLES.HUB}>
                <DashboardLayout pageTitle="Shipment Management">

                    <div className="p-6 space-y-6 bg-gray-50 min-h-screen animate-pulse">

                        {/* Breadcrumb */}
                        <div className="h-4 w-40 bg-gray-200 rounded"></div>

                        {/* Header */}
                        <div className="h-16 bg-gray-200 rounded-xl"></div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
                            ))}
                        </div>

                        {/* Route Card */}
                        <div className="h-32 bg-gray-200 rounded-xl"></div>

                        {/* Parcel List */}
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-14 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>

                        {/* Action Panel */}
                        <div className="h-16 bg-gray-200 rounded-xl"></div>

                    </div>
                </DashboardLayout>
            </DashboardProvider>

        </>
    );
}