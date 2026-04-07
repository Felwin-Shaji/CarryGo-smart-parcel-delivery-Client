import { useEffect, useState } from "react";
import type { WorkersBookingDetailsUI, WorkerShipmentDetails } from "../../../constants_Types/types/Worker/workerShipment";
import ShipmentDetails from "./components/ShipmentDetails/ShipmentDetails";
import { useWorkerShipments } from "../../../Services/Worker/WorkersShipment";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { ROLES } from "../../../constants_Types/types/roles";
import Breadcrumbs from "../../../components/globelcomponents/Breadcrumbs";
import { BookingDetailsModal } from "./components/BookingDetailsModal";
import { mapParcelActionToStatus, mapShipmentActionToStatus } from "./utils";

export default function WorkerShipmentDetailsPage() {
    const { id } = useParams();

    const [data, setData] = useState<WorkerShipmentDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<WorkersBookingDetailsUI | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        getShipmentDetails,
        getBookingDetails,
        updateShipmentStatus,
    } = useWorkerShipments();

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

    const handleShipmentAction = async (action: string) => {
        if (!data) return;

        const nextStatus = mapShipmentActionToStatus(action);

        try {
            await updateShipmentStatus(data.id, nextStatus);

            setData(prev =>
                prev ? { ...prev, status: nextStatus } : prev
            );
        } catch (err) {
            console.error("Shipment update failed", err);
        }
    };

    const handleParcelAction = async (parcelId: string, action: string) => {
        if (!data) return;

        const nextStatus = mapParcelActionToStatus(action);

        try {
            // 👉 You will add API later (if exists)
            // await updateParcel(parcelId, nextStatus);

            // ✅ UI update
            setData(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    parcels: prev.parcels.map(p =>
                        p.id === parcelId
                            ? { ...p, status: nextStatus }
                            : p
                    ),
                };
            });
        } catch (err) {
            console.error("Parcel update failed", err);
        }
    };

    // 🔥 OPEN PARCEL MODAL
    const handleOpenParcel = async (parcelId: string) => {
        const parcel = data?.parcels.find(p => p.id === parcelId);
        if (!parcel) return;
        const booking = await getBookingDetails(parcel.bookingId);
        setSelectedBooking(booking);
        setIsModalOpen(true);

    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (!data) return <p className="p-4">No data</p>;

    return (
        <>
            <DashboardProvider role={ROLES.WORKER}>

                <DashboardLayout pageTitle="My Shipments">


                    {/* ✅ Breadcrumbs */}
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


                    {isModalOpen && (
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

