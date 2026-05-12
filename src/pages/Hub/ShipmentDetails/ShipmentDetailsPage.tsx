import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HeaderSection from "./components/HeaderSection";
import SummaryCards from "./components/SummaryCards";
import RouteCard from "./components/RouteCard";
import ParcelList from "./components/ParcelList";
import ActionPanel from "./components/ActionPanel";
import type { ShipmentParcelsResponse } from "../../../shared/constants_Types/types/Hub/HubShipment";
import { useHubShipment } from "../../../Services/Hub/HubShipment";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { ROLES } from "../../../shared/constants_Types/types/roles";
import Breadcrumbs from "../../../shared/components/globelcomponents/Breadcrumbs";
import { useState } from "react";
import EditShipmentModal from "./components/EditShipmentModal";
import ShipmentDetailsSkeleton from "./components/ShipmentDetailsSkeleton";

export default function ShipmentDetailsPage() {
    const location = useLocation();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fromTab = location.state?.fromTab;
    const { shipmentId } = useParams();

    const { getShipmentById } = useHubShipment();


    const breadcrumbItems = [
        {
            label: "Shipments",
            to: `/hub/shipments?type=${fromTab || "BULK_PICKUP"}`,
        },
        { label: `Shipment #${shipmentId?.slice(-6)}` },
    ];

    const { data, isLoading } = useQuery<ShipmentParcelsResponse>({
        queryKey: ["shipment-details", shipmentId],
        queryFn: () => getShipmentById(shipmentId!),
        enabled: !!shipmentId,
    });

    if (isLoading) return <ShipmentDetailsSkeleton />;
    if (!data) return <div className="p-6">Shipment not found</div>;

    return (
        <>
            <DashboardProvider role={ROLES.HUB}>
                <DashboardLayout pageTitle="Shipment Management">
                    
                    {isEditModalOpen && (
                        <EditShipmentModal
                            shipment={data.shipmentDetails}
                            onClose={() => setIsEditModalOpen(false)}
                        />
                    )}
                    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

                        <Breadcrumbs items={breadcrumbItems} />

                        <HeaderSection shipment={data.shipmentDetails} />

                        <SummaryCards shipment={data.shipmentDetails} />

                        <RouteCard shipment={data.shipmentDetails} />

                        <ParcelList parcels={data.shipmentDetails.parcels} />

                        <ActionPanel
                            shipment={data.shipmentDetails}
                            onEdit={() => setIsEditModalOpen(true)}
                        />

                    </div>
                </DashboardLayout>
            </DashboardProvider>
        </>
    );
}

