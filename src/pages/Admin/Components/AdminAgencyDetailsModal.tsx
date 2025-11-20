import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAdmin } from "../../../Services/Admin";
import LoadingScreen from "../../../components/loading/CarryGoLoadingScreen";
import { } from "react-icons/fi";
import { FaLeftLong } from "react-icons/fa6";
import { KYCSTATUS, type KYCStatus } from "../../../types/roles";
import { confirmToast } from "../../../components/globelcomponents/confirmToast";

export default function AdminAgencyDetailsModal({
    open,
    agencyId,
    onClose,
    onUpdated,
}: {
    open: boolean;
    agencyId: string | null;
    onClose: () => void;
    onUpdated: () => void;
}) {
    const { getAgencyById, updateAgencyKycStatus } = useAdmin();
    const [loading, setLoading] = useState(false);
    const [agency, setAgency] = useState<any>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (!open || !agencyId) return;

        setLoading(true);
        getAgencyById(agencyId)
            .then((res) => setAgency(res))
            .catch(() => toast.error("Failed to load details"))
            .finally(() => setLoading(false));
    }, [open, agencyId]);

    const updateKYC = async (status: KYCStatus) => {
        if (!agencyId) return;

        let message: string = "Are shure";
        if (status === KYCSTATUS.APPROVED) message = `Are you sure you want to approve ${agency.agency.name}'s KYC?`;
        if (status === KYCSTATUS.REJECTED) message = `Are you sure you want to reject ${agency.agency.name}'s KYC?`;

        confirmToast(message, async () => {
            try {
                console.log("ksksksksksksksksk")
                setActionLoading(true);

                const result = await updateAgencyKycStatus(agencyId, status);
                toast.success(result.message || "KYC updated successfully");

                onUpdated();  // refresh data
                onClose();    // close modal

            } catch (error: any) {
                toast.error(error.response?.data?.message || "Failed");
            } finally {
                setActionLoading(false);
            }
        });
    };


    if (!open) return null;

    return (

        <>
            {/* HEADER */}
            <div className="flex justify-between items-center border-b pb-3">
                <button onClick={onClose} className="text-xl"><FaLeftLong /></button>
                {/* <h2 className="text-lg font-semibold">Agency Details</h2> */}
            </div>

            {loading && <LoadingScreen />}

            {/* BODY */}
            {!loading && agency && (
                <div className="mt-4 space-y-6">

                    {/* BASIC DETAILS */}
                    <div className="p-4 rounded border bg-gray-50">

                        <div>
                            <h3 className="font-semibold text-lg mb-2">{agency.agency.name}</h3>

                            <p><strong>Email:</strong> {agency.agency.email}</p>
                            <p><strong>Mobile:</strong> {agency.agency.mobile}</p>

                            <p className="mt-2">
                                <strong>KYC Status: </strong>
                                <span
                                    className={`px-3 py-1 rounded 
                    ${agency.kyc?.status === "APPROVED"
                                            ? "bg-green-100 text-green-600"
                                            : agency.kyc?.status === "PENDING"
                                                ? "bg-orange-100 text-orange-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {agency.kyc?.status}
                                </span>
                            </p>

                            <p><strong>Wallet:</strong> ₹ {agency.agency.walletBalance}</p>
                        </div>


                        <div className="flex justify-end gap-3">
                            <button
                                disabled={actionLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                                onClick={() => updateKYC(KYCSTATUS.REJECTED)}
                            >
                                Reject
                            </button>

                            <button
                                disabled={actionLoading}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                                onClick={() => updateKYC(KYCSTATUS.APPROVED)}
                            >
                                Approve
                            </button>
                        </div>
                    </div>

                    {/* DOCUMENTS SECTION */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">KYC Documents</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                            {/* TRADE LICENSE */}
                            <div className="text-center">
                                <p className="font-semibold">Trade License - #{agency.kyc?.tradeLicenseNumber}</p>
                                <a
                                    href={agency.kyc?.tradeLicenseDocument}
                                    target="_blank"
                                    className="text-blue-600 underline text-sm"
                                >
                                    tradelicense.img
                                </a>

                                <img
                                    src={agency.kyc?.tradeLicenseDocument}
                                    alt="Trade License"
                                    className="w-full h-48 object-cover rounded mt-2 border"
                                />
                            </div>

                            {/* PAN CARD */}
                            <div className="text-center">
                                <p className="font-semibold">PAN - {agency.kyc?.PANnumber}</p>
                                <a
                                    href={agency.kyc?.PAN_photo}
                                    target="_blank"
                                    className="text-blue-600 underline text-sm"
                                >
                                    pancard.img
                                </a>

                                <img
                                    src={agency.kyc?.PAN_photo}
                                    alt="PAN Card"
                                    className="w-full h-48 object-cover rounded mt-2 border"
                                />
                            </div>

                            {/* GST CERTIFICATE */}
                            <div className="text-center">
                                <p className="font-semibold">
                                    GST: {agency.kyc?.gst_number}
                                </p>
                                <a
                                    href={agency.kyc?.gst_certificate}
                                    target="_blank"
                                    className="text-blue-600 underline text-sm"
                                >
                                    gst.img
                                </a>

                                <img
                                    src={agency.kyc?.gst_certificate}
                                    alt="GST Certificate"
                                    className="w-full h-48 object-cover rounded mt-2 border"
                                />
                            </div>

                        </div>


                    </div>

                </div>
            )}

            {/* FOOTER BUTTONS */}

        </>
    );
}
