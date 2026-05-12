import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FileSection } from "../../../../pages/User/Traveler/TravelerConponents/TravelerKYCRejected";
import { useHubAddWorker } from "../../../../Services/Hub/HubAddWorkers";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";

type IdType = "AADHAAR" | "DL" | "PASSPORT";

interface ExistingKyc {
    idType: IdType;
    idNumber: string;
    documentUrl: string;
    selfieUrl: string;
    rejectionReason?: string;
}

interface Errors {
    idNumber?: string;
    document?: string;
    selfie?: string;
}

export default function WorkerKycResubmit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { getWorkerKyc, reSubmitWorkerKyc } = useHubAddWorker();

    const [existingKyc, setExistingKyc] = useState<ExistingKyc | null>(null);

    const [idType, setIdType] = useState<IdType>("AADHAAR");
    const [idNumber, setIdNumber] = useState("");

    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);

    const [removeDocument, setRemoveDocument] = useState(false);
    const [removeSelfie, setRemoveSelfie] = useState(false);

    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const fetchWorkerKyc = useCallback(async () => {
        try {
            if (!id) return;
            const res = await getWorkerKyc(id);
            setExistingKyc(res);

            if (res) {
                setIdType(res.idType);
                setIdNumber(res.idNumber);
            }
        } catch {
            toast.error("Failed to load worker KYC");
        } finally {
            setInitialLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchWorkerKyc();
    }, [fetchWorkerKyc]);


    const validate = (): Errors => {
        const err: Errors = {};


        if (!idNumber.trim()) {
            err.idNumber = `${idType} number is required`;
        }

        const hasExistingDocument =
            !!existingKyc?.documentUrl && !removeDocument;

        const hasNewDocument =
            !!documentFile;

        if (!hasExistingDocument && !hasNewDocument) {
            err.document =
                "Please upload a new identity document";
        }

        const hasExistingSelfie =
            !!existingKyc?.selfieUrl && !removeSelfie;

        const hasNewSelfie =
            !!selfieFile;

        if (!hasExistingSelfie && !hasNewSelfie) {
            err.selfie =
                "Please upload a new selfie";
        }

        return err;
    };

    const handleSubmit = async () => {
        if (loading) return;
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("idType", idType);
            formData.append("idNumber", idNumber);
            formData.append("resubmit", "true");

            if (documentFile) {
                formData.append("document", documentFile);
            }
            if (selfieFile) {
                formData.append("selfie", selfieFile);
            }
            if (removeDocument) {
                formData.append("removeDocument", "true");
            }
            if (removeSelfie) {
                formData.append("removeSelfie", "true");
            }

            if (!id) return;
            await reSubmitWorkerKyc(id, formData);

            toast.success("KYC resubmitted successfully");
            navigate(-1);
        } catch {
            toast.error("Failed to resubmit KYC");
        } finally {
            setLoading(false);
        }
    };


    if (initialLoading) {
        return (
            <DashboardProvider role="hub">
                <DashboardLayout pageTitle="Resubmit KYC">
                    <div className="flex justify-center items-center py-32">
                        <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
                    </div>
                </DashboardLayout>
            </DashboardProvider>
        );
    }


    return (
        <DashboardProvider role="hub">
            <DashboardLayout pageTitle="Resubmit KYC">

                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold text-slate-800">
                            Resubmit Worker KYC
                        </h2>

                        <p className="text-gray-500">
                            Update the rejected KYC details and submit again for verification.
                        </p>
                    </div>

                    {/* Rejection Reason */}
                    {existingKyc?.rejectionReason && (
                        <div
                            className="border border-red-200 bg-gradient-to-r from-red-50 to-red-100/40 rounded-2xl p-5"
                        >
                            <div className="flex items-start gap-3">

                                <div
                                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-red-100
                                        flex
                                        items-center
                                        justify-center
                                        text-red-600
                                        font-bold
                                    "
                                >
                                    !
                                </div>

                                <div>
                                    <p className="font-semibold text-red-700">
                                        Verification Rejected
                                    </p>

                                    <p className="text-sm text-red-600 mt-1 leading-relaxed">
                                        {existingKyc.rejectionReason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Document Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Type */}
                        <div className="space-y-2">

                            <label className="text-sm font-medium text-slate-700">
                                Document Type
                            </label>

                            <select
                                value={idType}
                                onChange={(e) =>
                                    setIdType(e.target.value as IdType)
                                }
                                className="
                                    w-full
                                    h-12
                                    px-4
                                    rounded-xl
                                    border
                                    border-gray-300
                                    outline-none
                                    focus:border-blue-600
                                    focus:ring-4
                                    focus:ring-blue-100
                                    transition-all
                                    bg-white
                                "
                            >
                                <option value="AADHAAR">Aadhaar</option>
                                <option value="DL">Driving License</option>
                                <option value="PASSPORT">Passport</option>
                            </select>
                        </div>

                        {/* Number */}
                        <div className="space-y-2">

                            <label className="text-sm font-medium text-slate-700">
                                {idType} Number
                            </label>

                            <input
                                value={idNumber}
                                onChange={(e) => {
                                    setIdNumber(e.target.value);

                                    setErrors((prev) => ({
                                        ...prev,
                                        idNumber: undefined
                                    }));
                                }}
                                placeholder={`Enter ${idType} number`}
                                className="
                                    w-full
                                    h-12
                                    px-4
                                    rounded-xl
                                    border
                                    border-gray-300
                                    outline-none
                                    focus:border-blue-600
                                    focus:ring-4
                                    focus:ring-blue-100
                                    transition-all
                                "
                            />

                            {errors.idNumber && (
                                <p className="text-xs text-red-500">
                                    {errors.idNumber}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Upload Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Document */}
                        <div
                            className="
                                border
                                border-gray-200
                                rounded-2xl
                                p-5
                                bg-slate-50/60
                                space-y-4
                            "
                        >
                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    Identity Document
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    Upload valid government ID proof
                                </p>
                            </div>

                            <FileSection
                                title="Upload Document"
                                existingUrl={existingKyc?.documentUrl}
                                file={documentFile}
                                error={errors.document}
                                onFile={(file) => {
                                    setDocumentFile(file);
                                    setRemoveDocument(false);
                                }}
                                onRemove={() => {
                                    setRemoveDocument(true);
                                    setDocumentFile(null);
                                }}
                            />
                        </div>

                        {/* Selfie */}
                        <div
                            className="
                                border
                                border-gray-200
                                rounded-2xl
                                p-5
                                bg-slate-50/60
                                space-y-4
                            "
                        >
                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    Selfie Verification
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    Upload clear face photo
                                </p>
                            </div>

                            <FileSection
                                title="Upload Selfie"
                                existingUrl={existingKyc?.selfieUrl}
                                file={selfieFile}
                                error={errors.selfie}
                                round
                                onFile={(file) => {
                                    setSelfieFile(file);
                                    setRemoveSelfie(false);
                                }}
                                onRemove={() => {
                                    setRemoveSelfie(true);
                                    setSelfieFile(null);
                                }}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="
                            w-full
                            h-12
                            rounded-xl
                            bg-blue-700
                            hover:bg-blue-800
                            text-white
                            font-semibold
                            transition-all
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                            flex
                            items-center
                            justify-center
                            shadow-sm
                        "
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Resubmitting...
                            </div>
                        ) : (
                            "Resubmit KYC"
                        )}
                    </button>

                </div>

            </DashboardLayout>
        </DashboardProvider>
    );
}