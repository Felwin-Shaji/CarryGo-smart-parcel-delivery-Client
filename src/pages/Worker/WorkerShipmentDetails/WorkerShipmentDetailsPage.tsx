import { useEffect, useState } from "react";
import type { ParcelAction, ShipmentAction, WorkersBookingDetailsUI, WorkerShipmentDetails } from "../../../constants_Types/types/Worker/workerShipment";
import ShipmentDetails from "./components/ShipmentDetails/ShipmentDetails";
import { useWorkerShipments } from "../../../Services/Worker/WorkersShipment";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { ROLES } from "../../../constants_Types/types/roles";
import Breadcrumbs from "../../../components/globelcomponents/Breadcrumbs";
import { BookingDetailsModal } from "./components/BookingDetailsModal";
import { mapParcelActionToStatus, mapShipmentActionToStatus, PARCEL_FLOW } from "./utils";
import WorkerShipmentDetailsSkeleton from "./components/ShipmentDetails/components/WorkerShipmentDetailsSkeleton";

export default function WorkerShipmentDetailsPage() {
    const { id } = useParams();

    const [data, setData] = useState<WorkerShipmentDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<WorkersBookingDetailsUI | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const { bulkUpdateParcels, getShipmentDetails, updateShipmentStatus, getBookingDetails } = useWorkerShipments();



    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const res = await getShipmentDetails(id);
                setData(res);
            } catch (err) {
                console.error("Failed to fetch shipment", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleShipmentAction = async (action: ShipmentAction) => {
        if (!data) return;

        const nextStatus = mapShipmentActionToStatus(action);

        //  STRICT VALIDATION
        const parcels = data.parcels;

        if (action === "DISPATCH" && !parcels.every(p => p.status === "LOADED")) {
            alert("All parcels must be LOADED before dispatch");
            return;
        }

        if (action === "MARK_ARRIVED" && !parcels.every(p => p.status === "IN_TRANSIT")) {
            alert("All parcels must be IN_TRANSIT before arriving");
            return;
        }

        if (action === "COMPLETE" && !parcels.every(p => p.status === "UNLOADED")) {
            alert("All parcels must be UNLOADED before completing");
            return;
        }

        try {
            await updateShipmentStatus(data.id, nextStatus);

            const fresh = await getShipmentDetails(data.id);
            setData(fresh);

        } catch (err) {
            console.error("Shipment update failed", err);
        }
    };

    const handleParcelAction = async (parcelIds: string[], action: ParcelAction) => {
        if (!data) return;

        const nextStatus = mapParcelActionToStatus(action);

        try {
            await bulkUpdateParcels(data.id, parcelIds, nextStatus);

            const fresh = await getShipmentDetails(data.id);
            setData(fresh);

        } catch (err) {
            console.error("Parcel update failed", err);
        }
    };

    // OPEN PARCEL MODAL
    const handleOpenParcel = async (parcelId: string) => {
        const parcel = data?.parcels.find(p => p.id === parcelId);
        if (!parcel) return;

        try {
            setModalLoading(true);
            setIsModalOpen(true);

            const booking = await getBookingDetails(parcel.bookingId);
            setSelectedBooking(booking);
        } catch (err) {
            console.error("Failed to fetch booking", err);
        } finally {
            setModalLoading(false);
        }
    };

    if (loading) return <WorkerShipmentDetailsSkeleton />
    if (!data) return <p className="p-4">No data</p>;

    return (
        <>
            <DashboardProvider role={ROLES.WORKER}>

                <DashboardLayout pageTitle="My Shipments">


                    {/*  Breadcrumbs */}
                    <Breadcrumbs
                        items={[
                            { label: "Shipments", to: "/worker/shipments" },
                            { label: data.id },
                        ]}
                    />

                    <ShipmentDetails
                        data={data}
                        role="worker"
                        onShipmentAction={handleShipmentAction}
                        onParcelAction={handleParcelAction}
                        onOpenParcel={handleOpenParcel}
                    />


                    {isModalOpen && selectedBooking && (
                        <BookingDetailsModal
                            booking={selectedBooking}
                            onClose={() => setIsModalOpen(false)}
                        />
                    )}
                </DashboardLayout>
            </DashboardProvider>
        </>
    );
}

