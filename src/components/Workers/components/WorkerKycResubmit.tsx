import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileSection } from "../../../pages/User/Traveler/TravelerConponents/TravelerKYCRejected";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { DashboardLayout } from "../../../layouts/DashboardLayout";

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
    const { id } = useParams()
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

    /* 🔹 Load existing KYC */
    useEffect(() => {
        (async () => {
            if (!id) return;
            const res = await getWorkerKyc(id);
            setExistingKyc(res);

            if (res) {
                setIdType(res.idType);
                setIdNumber(res.idNumber);
            }
        })();
    }, []);

    /* 🔹 Validation */
    const validate = (): Errors => {
        const err: Errors = {};

        if (!idNumber.trim()) {
            err.idNumber = `${idType} number is required`;
        }

        if (!documentFile && !existingKyc?.documentUrl && !removeDocument) {
            err.document = "Document required";
        }

        if (!selfieFile && !existingKyc?.selfieUrl && !removeSelfie) {
            err.selfie = "Selfie required";
        }

        return err;
    };

    /* 🔹 Submit */
    const handleSubmit = async () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("idType", idType);
            formData.append("idNumber", idNumber);
            formData.append("resubmit", "true");

            if (documentFile) formData.append("document", documentFile);
            if (selfieFile) formData.append("selfie", selfieFile);

            if (removeDocument) formData.append("removeDocument", "true");
            if (removeSelfie) formData.append("removeSelfie", "true");

            if (!id) return;
            await reSubmitWorkerKyc(id, formData);

            navigate(-1)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardProvider role="hub">

                <DashboardLayout pageTitle="Resubmit Kyc">

                    <div className="max-w-xl mx-auto bg-white p-8 border rounded-xl shadow space-y-6">

                        <div>
                            <h2 className="text-2xl font-bold text-red-600">
                                Resubmit Worker KYC
                            </h2>

                            {existingKyc?.rejectionReason && (
                                <div className="mt-3 border border-red-300 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                                    <p className="font-semibold">Reason for rejection</p>
                                    <p className="mt-1">{existingKyc.rejectionReason}</p>
                                </div>
                            )}
                        </div>

                        {/* ID TYPE */}
                        <select
                            value={idType}
                            onChange={(e) => setIdType(e.target.value as IdType)}
                            className="w-full border px-4 py-2 rounded"
                        >
                            <option value="AADHAAR">Aadhaar</option>
                            <option value="DL">Driving License</option>
                            <option value="PASSPORT">Passport</option>
                        </select>

                        {/* ID NUMBER */}
                        <div>
                            <input
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder={`Enter ${idType} number`}
                                className="w-full border px-4 py-2 rounded"
                            />
                            {errors.idNumber && (
                                <p className="text-xs text-red-500 mt-1">{errors.idNumber}</p>
                            )}
                        </div>

                        {/* DOCUMENT */}
                        <FileSection
                            title="Identity Document"
                            existingUrl={existingKyc?.documentUrl}
                            file={documentFile}
                            error={errors.document}
                            onFile={(f) => {
                                setDocumentFile(f);
                                setRemoveDocument(false);
                            }}
                            onRemove={() => {
                                setRemoveDocument(true);
                                setDocumentFile(null);
                            }}
                        />

                        {/* SELFIE */}
                        <FileSection
                            title="Selfie"
                            existingUrl={existingKyc?.selfieUrl}
                            file={selfieFile}
                            error={errors.selfie}
                            round
                            onFile={(f) => {
                                setSelfieFile(f);
                                setRemoveSelfie(false);
                            }}
                            onRemove={() => {
                                setRemoveSelfie(true);
                                setSelfieFile(null);
                            }}
                        />

                        {/* SUBMIT */}
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
                        >
                            {loading ? "Resubmitting..." : "Resubmit KYC"}
                        </button>

                    </div>
                </DashboardLayout>
            </DashboardProvider>
        </>
    );
}