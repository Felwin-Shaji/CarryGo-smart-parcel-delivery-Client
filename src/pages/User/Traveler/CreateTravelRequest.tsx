import { Formik, Form, Field, ErrorMessage } from "formik";
import { Header } from "../components/Header";
import { travelRequestValidationSchema } from "../../../validation/createTravelRequestSchema";
import { useEffect, useState } from "react";
import AddressSelectModal from "../components/AddressComponents/AddressSelectModal";
import { useAddress } from "../../../Services/User/useAddress";
import type { Address } from "../AddressListPage";
import type { PackageSizeType } from "../components/BookingComponent/BookingListing/BookingCard";
import type { CreateTravelRequestDTO, TransportMode } from "../../../constants_Types/types/User/Traveler/TravelerType";
import { useTravelRequest } from "../../../Services/User/Traveler/TravelRequest";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";



interface TravelRequestFormValues {
    startAddressId: string;
    endAddressId: string;
    departureAt: string;
    arrivalAt: string;
    capacityKg: string;
    allowedPackageSizes: PackageSizeType[];
    modeOfTransport: TransportMode;
    description: string;
}



const CreateTravelRequest = () => {
    const { getAddresses } = useAddress();
    const { createTravelRequest } = useTravelRequest();
    const navigate = useNavigate();


    const [pickupModalOpen, setPickupModalOpen] = useState(false);
    const [dropModalOpen, setDropModalOpen] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getAddresses();
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
            <div className="pt-24 relative">


                <div className="min-h-screen bg-gray-50 py-10 px-6">
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-center justify-between mb-8">

                            <h1 className="text-3xl font-bold">
                                Publish Travel Request
                            </h1>

                            <button
                                type="button"
                                onClick={() => navigate("/traveler")}
                                className="flex items-center justify-center 
                                w-12 h-12 rounded-full bg-white shadow-lg border text-gray-700 hover:bg-gray-100
                                transition-all">
                                <ArrowLeft size={20} />
                            </button>

                        </div>



                        <Formik<TravelRequestFormValues>
                            initialValues={{
                                startAddressId: "",
                                endAddressId: "",
                                departureAt: "",
                                arrivalAt: "",
                                capacityKg: "",
                                allowedPackageSizes: [],
                                modeOfTransport: "FLIGHT",
                                description: "",
                            }}

                            validationSchema={travelRequestValidationSchema}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    const payload: CreateTravelRequestDTO = {
                                        startAddressId: values.startAddressId,
                                        endAddressId: values.endAddressId,
                                        departureAt: new Date(values.departureAt).toISOString(),
                                        arrivalAt: new Date(values.arrivalAt).toISOString(),
                                        capacityKg: Number(values.capacityKg),
                                        remainingCapacityKg: Number(values.capacityKg),
                                        allowedPackageSizes: values.allowedPackageSizes,
                                        modeOfTransport: values.modeOfTransport,
                                        description: values.description,
                                        status: "DRAFT",
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
                                <Form className="space-y-8">

                                    {/* ROUTE */}
                                    <section className="space-y-6">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                Route
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Select where you are traveling from and to.
                                            </p>
                                        </div>

                                        {/* Pickup */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Pickup Address
                                            </label>

                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setPickupModalOpen(true)}
                                                className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition hover:border-black"
                                            >
                                                {loadingAddresses ? (
                                                    <span className="text-gray-400">Loading addresses...</span>
                                                ) : values.startAddressId ? (
                                                    (() => {
                                                        const addr = addresses.find(
                                                            (a) => a._id === values.startAddressId
                                                        );

                                                        if (!addr)
                                                            return (
                                                                <span className="text-gray-400">
                                                                    Select Pickup Address
                                                                </span>
                                                            );

                                                        return (
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-semibold text-gray-900">
                                                                        {addr.label}
                                                                    </span>

                                                                    {addr.isDefault && (
                                                                        <span className="text-[11px] bg-black text-white px-2 py-0.5 rounded-full">
                                                                            DEFAULT
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="text-sm text-gray-500">
                                                                    {addr.formattedAddress ??
                                                                        `${addr.addressLine1}, ${addr.city}`}
                                                                </p>
                                                            </div>
                                                        );
                                                    })()
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Select Pickup Address
                                                    </span>
                                                )}
                                            </div>

                                            <ErrorMessage
                                                name="startAddressId"
                                                component="p"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>

                                        {/* Destination */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">
                                                Destination Address
                                            </label>

                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => setDropModalOpen(true)}
                                                className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition hover:border-black"
                                            >
                                                {values.endAddressId ? (
                                                    (() => {
                                                        const addr = addresses.find(
                                                            (a) => a._id === values.endAddressId
                                                        );

                                                        if (!addr)
                                                            return (
                                                                <span className="text-gray-400">
                                                                    Select Destination Address
                                                                </span>
                                                            );

                                                        return (
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-semibold text-gray-900">
                                                                        {addr.label}
                                                                    </span>

                                                                    {addr.isDefault && (
                                                                        <span className="text-[11px] bg-black text-white px-2 py-0.5 rounded-full">
                                                                            DEFAULT
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <p className="text-sm text-gray-500">
                                                                    {addr.formattedAddress ??
                                                                        `${addr.addressLine1}, ${addr.city}`}
                                                                </p>
                                                            </div>
                                                        );
                                                    })()
                                                ) : (
                                                    <span className="text-gray-400">
                                                        Select Destination Address
                                                    </span>
                                                )}
                                            </div>

                                            <ErrorMessage
                                                name="endAddressId"
                                                component="p"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </section>




                                    {/* SCHEDULE */}
                                    <section>
                                        <h2 className="font-semibold text-lg mb-4">Schedule</h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Field
                                                type="datetime-local"
                                                name="departureAt"
                                                className="border rounded-lg px-4 py-3"
                                            />
                                            <Field
                                                type="datetime-local"
                                                name="arrivalAt"
                                                className="border rounded-lg px-4 py-3"
                                            />
                                        </div>
                                        <ErrorMessage name="departureAt" component="p" className="text-red-500 text-sm mt-2" />
                                    </section>

                                    {/* CAPACITY */}
                                    <section>
                                        <h2 className="font-semibold text-lg mb-4">
                                            Capacity & Pricing
                                        </h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Field
                                                type="number"
                                                name="capacityKg"
                                                placeholder="Capacity (Kg)"
                                                className="border rounded-lg px-4 py-3"
                                            />
                                        </div>
                                        <ErrorMessage name="capacityKg" component="p" className="text-red-500 text-sm mt-2" />
                                    </section>

                                    {/* PACKAGE SIZE */}
                                    <section>
                                        <h2 className="font-semibold text-lg mb-4">
                                            Allowed Package Sizes
                                        </h2>

                                        <div className="flex gap-4">
                                            {["SMALL", "MEDIUM", "LARGE"].map((size) => (
                                                <button
                                                    type="button"
                                                    key={size}
                                                    onClick={() => {
                                                        const updated = values.allowedPackageSizes.includes(size as PackageSizeType)
                                                            ? values.allowedPackageSizes.filter(s => s !== size)
                                                            : [...values.allowedPackageSizes, size as PackageSizeType];
                                                        setFieldValue("allowedPackageSizes", updated);
                                                    }}
                                                    className={`px-5 py-2 rounded-full border cursor-pointer transition-all ${values.allowedPackageSizes.includes(size as PackageSizeType)
                                                        ? "bg-blue-800 text-white border-blue-600"
                                                        : "bg-gray-100 text-black border-gray-300"
                                                        }`}
                                                >
                                                    {size}
                                                </button>

                                            ))}
                                        </div>
                                        <ErrorMessage name="allowedPackageSizes" component="p" className="text-red-500 text-sm mt-2" />
                                    </section>

                                    {/* TRANSPORT MODE */}
                                    <section>
                                        <h2 className="font-semibold text-lg mb-4">
                                            Mode of Transport
                                        </h2>

                                        <Field
                                            as="select"
                                            name="modeOfTransport"
                                            className="w-full border rounded-lg px-4 py-3"
                                        >
                                            <option value="FLIGHT">Flight</option>
                                            <option value="TRAIN">Train</option>
                                            <option value="CAR">Car</option>
                                            <option value="BUS">Bus</option>
                                            <option value="BIKE">Bike</option>
                                        </Field>
                                    </section>

                                    {/* DESCRIPTION */}
                                    <section>
                                        <h2 className="font-semibold text-lg mb-4">
                                            Additional Details
                                        </h2>

                                        <Field
                                            as="textarea"
                                            name="description"
                                            rows={3}
                                            className="w-full border rounded-lg px-4 py-3"
                                            placeholder="Add notes about your trip..."
                                        />
                                    </section>

                                    {/* SUBMIT */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg shadow-md transition disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Publishing..." : "Publish Trip"}
                                    </button>

                                    <AddressSelectModal
                                        isOpen={pickupModalOpen}
                                        onClose={() => setPickupModalOpen(false)}
                                        addresses={addresses}
                                        selectedId={values.startAddressId}
                                        onSelect={(id: string) => setFieldValue("startAddressId", id)}
                                    />

                                    <AddressSelectModal
                                        isOpen={dropModalOpen}
                                        onClose={() => setDropModalOpen(false)}
                                        addresses={addresses}
                                        selectedId={values.endAddressId}
                                        onSelect={(id: string) => setFieldValue("endAddressId", id)}
                                    />
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
