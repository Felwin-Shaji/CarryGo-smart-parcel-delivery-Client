import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAdmin } from "../../../Services/Admin";
import LoadingScreen from "../../../components/loading/CarryGoLoadingScreen";
import { } from "react-icons/fi";
import { FaLeftLong } from "react-icons/fa6";
import { confirmToast } from "../../../components/globelcomponents/confirmToast";
import { KYCSTATUS, type KYCStatus } from "../../../constants_Types/types/roles";


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

    const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
    const [rejectReason, setRejectReason] = useState("");


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
        if (status === KYCSTATUS.APPROVED) message = `Are you sure you want to approve ${agency.name}'s KYC?`;
        if (status === KYCSTATUS.REJECTED) message = `Are you sure you want to reject ${agency.name}'s KYC?`;

        confirmToast(message, async () => {
            try {
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


    const handleSubmitRejection = async () => {
        if (!agencyId) return;
        if (!rejectReason.trim()) {
            toast.error("Please enter a valid reason");
            return;
        }

        try {
            setActionLoading(true);

            const result = await updateAgencyKycStatus(agencyId, KYCSTATUS.REJECTED, rejectReason);

            toast.success(result.message || "KYC rejected");

            setRejectReason("");
            setShowRejectReasonModal(false);

            onUpdated();
            onClose();

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed");
        } finally {
            setActionLoading(false);
        }
    };



    if (!open) return null;

    return (



        <>

            {showRejectReasonModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">

                        <h3 className="text-lg font-semibold mb-3">Rejection Reason</h3>

                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full border p-2 rounded"
                            rows={4}
                            placeholder="Enter the reason for rejection..."
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => {
                                    setRejectReason("");
                                    setShowRejectReasonModal(false);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded"
                                disabled={!rejectReason.trim() || actionLoading}
                                onClick={() => handleSubmitRejection()}
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            )}

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
                            <h3 className="font-semibold text-lg mb-2">{agency.data.name}</h3>

                            <p><strong>Email:</strong> {agency.data.email}</p>
                            <p><strong>Mobile:</strong> {agency.data.mobile}</p>

                            <p className="mt-2">
                                <strong>KYC Status: </strong>
                                <span
                                    className={`px-3 py-1 rounded 
                    ${agency.data.kycStatus === "APPROVED"
                                            ? "bg-green-100 text-green-600"
                                            : agency.data.kycStatus === "PENDING"
                                                ? "bg-orange-100 text-orange-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {agency.data.kycStatus}
                                </span>
                            </p>

                            <p><strong>Wallet:</strong> ₹ {agency.data.walletBalance}</p>
                        </div>


                        <div className="flex justify-end gap-3">

                            {/* REJECT BUTTON */}
                            <button
                                disabled={actionLoading || agency.data.kycStatus == KYCSTATUS.APPROVED || agency.data.kycStatus == KYCSTATUS.REJECTED} 
                                className={`px-4 py-2 rounded text-white 
        ${agency.data.kycStatus == KYCSTATUS.APPROVED || agency.data.kycStatus == KYCSTATUS.REJECTED
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-600"
                                    }`}
                                onClick={() => setShowRejectReasonModal(true)}
                            >
                                Reject
                            </button>

                            {/* APPROVE BUTTON */}
                            <button
                                disabled={actionLoading || agency.data.kycStatus === KYCSTATUS.APPROVED || agency.data.kycStatus === KYCSTATUS.REJECTED}
                                className={`px-4 py-2 rounded text-white 
            ${agency.data.kycStatus === KYCSTATUS.APPROVED || agency.data.kycStatus === KYCSTATUS.REJECTED
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600"
                                    }`}
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
                                <p className="font-semibold">Trade License - #{agency.data.kyc?.tradeLicenseNumber}</p>
                                <a
                                    href={agency.data.kyc?.tradeLicenseDocument}
                                    target="_blank"
                                    className="text-blue-600 underline text-sm"
                                >
                                    tradelicense.img
                                </a>

                                <img
                                    src={agency.data.kyc?.tradeLicenseDocument}
                                    alt="Trade License"
                                    className="w-full h-48 object-cover rounded mt-2 border"
                                />
                            </div>

                            {/* PAN CARD */}
                            <div className="text-center">
                                <p className="font-semibold">PAN - {agency.data.kyc?.PANnumber}</p>
                                <a
                                    href={agency.data.kyc?.PAN_photo}
                                    target="_blank"
                                    className="text-blue-600 underline text-sm"
                                >
                                    pancard.img
                                </a>

                                <img
                                    src={agency.data.kyc?.PAN_photo}
                                    alt="PAN Card"
                                    className="w-full h-48 object-cover rounded mt-2 border"
                                />
                            </div>

                            {/* GST CERTIFICATE */}
                            <div className="text-center">
                                <p className="font-semibold">
                                    GST: {agency.data.kyc?.gst_number}
                                </p>
                                <a
                                    href={agency.data.kyc?.gst_certificate}
                                    target="_blank"
                                    className="text-blue-600 underline text-sm"
                                >
                                    gst.img
                                </a>

                                <img
                                    src={agency.data.kyc?.gst_certificate}
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
