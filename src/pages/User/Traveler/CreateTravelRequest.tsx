import { Formik, Form, } from "formik";
import { Header } from "../components/Header";
import { travelRequestValidationSchema } from "../../../validation/createTravelRequestSchema";
import { useEffect, useState } from "react";
import type { CreateTravelRequestDTO, TransportMode } from "../../../constants_Types/types/User/Traveler/TravelerType";
import { useTravelRequest } from "../../../Services/User/Traveler/TravelRequest";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { AddressUI } from "../../../context/Booking/Booking.types";
import { useBooking } from "../../../Services/User/Booking/createBooking";
import AddressModal from "../components/BookingComponent/BookingStepsComponents/AddressModal";
import NotesSection from "./TravelerConponents/TravelRequest/NotesSection";
import TransportPricingSection from "./TravelerConponents/TravelRequest/TransportPricingSection";
import CapacitySection from "./TravelerConponents/TravelRequest/CapacitySection";
import ScheduleSection from "./TravelerConponents/TravelRequest/ScheduleSection";
import RouteSection from "./TravelerConponents/TravelRequest/RouteSection";



interface TravelRequestFormValues {
    startAddress: AddressUI | null;
    endAddress: AddressUI | null;
    departureAt: string;
    arrivalAt: string;
    capacityKg: string;
    totalVolumeCm3: string;
    allowedPackageDimensions: {
        maxLengthCm: number;
        maxWidthCm: number;
        maxHeightCm: number;
    },
    modeOfTransport: TransportMode;
    description: string;
}


const CreateTravelRequest = () => {
    const { getUserAddresses } = useBooking();
    const { createTravelRequest } = useTravelRequest();
    const navigate = useNavigate();


    const [pickupModalOpen, setPickupModalOpen] = useState(false);
    const [dropModalOpen, setDropModalOpen] = useState(false);
    const [addresses, setAddresses] = useState<AddressUI[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getUserAddresses();
                setAddresses(data);
            } catch (error) {
                console.error("Failed to fetch addresses", error);
            } finally {
                setLoadingAddresses(false);
            }
        };

        fetchAddresses();
    }, []);
    return (
        <>
            <Header isLoggedIn={true} />
            <div className="pt-10 relative">


                <div className="min-h-screen bg-gray-50 py-10 px-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="flex items-start justify-between mb-8">

                            {/* Title Block */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Create Travel Plan
                                </h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    Plan your travel and earn by carrying parcels along your route.
                                </p>
                            </div>

                            {/* Back Button */}
                            <button
                                type="button"
                                onClick={() => navigate("/traveler")}
                                className="flex items-center justify-center
                                    w-11 h-11 rounded-full bg-white border shadow-sm
                                    text-gray-700 hover:bg-gray-100 transition"
                            >
                                <ArrowLeft size={18} />
                            </button>

                        </div>





                        <Formik<TravelRequestFormValues>
                            initialValues={{
                                startAddress: null,
                                endAddress: null,
                                departureAt: "",
                                arrivalAt: "",
                                capacityKg: "",
                                totalVolumeCm3: "",
                                allowedPackageDimensions: {
                                    maxHeightCm: 0,
                                    maxLengthCm: 0,
                                    maxWidthCm: 0
                                },
                                modeOfTransport: "FLIGHT",
                                description: "",
                            }}

                            validationSchema={travelRequestValidationSchema}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    const payload: CreateTravelRequestDTO = {
                                        startAddress: values.startAddress!,
                                        endAddress: values.endAddress!,
                                        departureAt: new Date(values.departureAt).toISOString(),
                                        arrivalAt: new Date(values.arrivalAt).toISOString(),
                                        capacityKg: Number(values.capacityKg),
                                        totalVolumeCm3: Number(values.totalVolumeCm3),
                                        allowedPackageDimensions: values.allowedPackageDimensions,
                                        modeOfTransport: values.modeOfTransport,
                                        description: values.description,
                                        // status: "DRAFT",
                                    };

                                    await createTravelRequest(payload);
                                    resetForm();
                                    navigate("/traveler");
                                } catch (error) {
                                    console.error("Failed to publish trip", error);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}

                        >
                            {({ values, setFieldValue, isSubmitting }) => (

                                <Form className="space-y-3">

                                    {/* Address Modals */}
                                    {pickupModalOpen && (
                                        <AddressModal
                                            type="PICKUP"
                                            savedAddresses={addresses}
                                            loading={loadingAddresses}
                                            onClose={() => setPickupModalOpen(false)}
                                            onSelectAddress={(addr) => {
                                                setFieldValue("startAddress", addr);
                                                setPickupModalOpen(false);
                                            }}
                                        />
                                    )}

                                    {dropModalOpen && (
                                        <AddressModal
                                            type="DELIVERY"
                                            savedAddresses={addresses}
                                            loading={loadingAddresses}
                                            onClose={() => setDropModalOpen(false)}
                                            onSelectAddress={(addr) => {
                                                setFieldValue("endAddress", addr);
                                                setDropModalOpen(false);
                                            }}
                                        />
                                    )}

                                    <RouteSection
                                        startAddress={values.startAddress}
                                        endAddress={values.endAddress}
                                        openPickup={() => setPickupModalOpen(true)}
                                        openDrop={() => setDropModalOpen(true)}
                                    />

                                    <ScheduleSection />

                                    <CapacitySection />

                                    <TransportPricingSection />

                                    <NotesSection />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2
                                            ${isSubmitting
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-black text-white hover:bg-gray-800"
                                            }`}
                                    >
                                        {isSubmitting && (
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        )}

                                        {isSubmitting ? "Publishing..." : "Publish Trip"}
                                    </button>

                                </Form>
                            )}

                        </Formik>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateTravelRequest;
