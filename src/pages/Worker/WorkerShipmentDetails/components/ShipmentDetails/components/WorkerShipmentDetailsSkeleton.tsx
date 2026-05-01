import { ROLES } from "../../../../../../shared/constants_Types/types/roles";
import { DashboardProvider } from "../../../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../../../layouts/DashboardLayout";

export default function WorkerShipmentDetailsSkeleton() {
    return (
        <DashboardProvider role={ROLES.WORKER}>

            <DashboardLayout pageTitle="My Shipments">

                <div className="p-4 space-y-4 animate-pulse">

                    {/* Breadcrumb */}
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>

                    {/* Header / Shipment Info */}
                    <div className="h-20 bg-gray-200 rounded-xl"></div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                        <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                    </div>

                    {/* Parcel List */}
                    <div className="space-y-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>

                </div>
            </DashboardLayout>
        </DashboardProvider>

    );
}