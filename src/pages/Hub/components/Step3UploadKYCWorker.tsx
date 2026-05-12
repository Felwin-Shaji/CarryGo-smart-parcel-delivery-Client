import { useState } from "react";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";
import toast from "react-hot-toast";
import WorkerProgressSteps from "./WorkerProgressSteps";



interface Step3Props {
    formData: { name: string; email: string; mobile: string; role: "worker"; };
    tempWorkerId: string | null;
    resetWorkerFlow: () => void;
}

const Step3UploadKYCWorker = ({ formData, resetWorkerFlow }: Step3Props) => {
    const { uploadKyc } = useHubAddWorker();

    const [idType, setIdType] = useState("AADHAAR");
    const [idNumber, setIdNumber] = useState("");
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        idNumber?: string;
        document?: string;
        selfie?: string;
    }>({});

    const validateIdNumber = () => {
        if (!idNumber.trim()) return `${idType} number is required`;

        if (idType === "AADHAAR" && !/^\d{12}$/.test(idNumber)) {
            return "Aadhaar number must be 12 digits";
        }

        if (idType === "PASSPORT" && !/^[A-Z0-9]{8,9}$/.test(idNumber)) {
            return "Invalid passport number";
        }

        if (idType === "DL" && idNumber.length < 10) {
            return "Invalid driving license number";
        }

        return null;
    };



    const handleSubmit = async () => {
        const newErrors: typeof errors = {};

        const idError = validateIdNumber();
        if (idError) newErrors.idNumber = idError;

        if (!documentFile) newErrors.document = "Document is required";
        if (!selfieFile) newErrors.selfie = "Selfie is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            setLoading(true);

            const payload = new FormData();
            payload.append("idType", idType);
            payload.append("idNumber", idNumber);
            payload.append("document", documentFile!);
            payload.append("selfie", selfieFile!);
            payload.append("email", formData.email);

            const res = await uploadKyc(payload);

            if (res.success) {
                localStorage.removeItem("otpWorkerMeta");
                toast.success(res.data.message);
                resetWorkerFlow();
            }
        } catch {
            toast.error("KYC submission failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full flex justify-center px-4 py-10">
            <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6">

                {/* Progress */}
                <WorkerProgressSteps currentStep={3} />

                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">
                        Worker KYC Verification
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Upload identity proof and selfie for worker verification.
                    </p>
                </div>

                {/* Document Type */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">
                        Document Type
                    </label>

                    <select
                        value={idType}
                        onChange={(e) => {
                            setIdType(e.target.value);
                            setIdNumber("");
                            setErrors((prev) => ({
                                ...prev,
                                idNumber: undefined,
                            }));
                        }}
                        className="
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

                {/* ID Number */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">
                        {idType} Number
                    </label>

                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => {
                            setIdNumber(e.target.value);
                            setErrors((prev) => ({
                                ...prev,
                                idNumber: undefined,
                            }));
                        }}
                        placeholder={`Enter ${idType} number`}
                        className="
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

                {/* Upload Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Document Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">
                            Upload Document
                        </label>

                        <label
                            className="
                            h-44
                            border-2
                            border-dashed
                            border-gray-300
                            rounded-2xl
                            flex
                            flex-col
                            items-center
                            justify-center
                            cursor-pointer
                            hover:border-blue-500
                            hover:bg-blue-50
                            transition-all
                            overflow-hidden
                        "
                        >
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                className="hidden"
                                onChange={(e) =>
                                    setDocumentFile(
                                        e.target.files?.[0] || null
                                    )
                                }
                            />

                            {!documentFile ? (
                                <>
                                    <p className="text-sm font-medium text-slate-700">
                                        Upload Document
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        JPG, PNG or PDF
                                    </p>
                                </>
                            ) : documentFile.type.includes("pdf") ? (
                                <div className="text-center px-4">
                                    <p className="text-sm font-medium text-blue-700">
                                        PDF Uploaded
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1 truncate">
                                        {documentFile.name}
                                    </p>
                                </div>
                            ) : (
                                <img
                                    src={URL.createObjectURL(documentFile)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </label>

                        {errors.document && (
                            <p className="text-xs text-red-500">
                                {errors.document}
                            </p>
                        )}
                    </div>

                    {/* Selfie Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">
                            Upload Selfie
                        </label>

                        <label
                            className="
                            h-44
                            border-2
                            border-dashed
                            border-gray-300
                            rounded-2xl
                            flex
                            flex-col
                            items-center
                            justify-center
                            cursor-pointer
                            hover:border-blue-500
                            hover:bg-blue-50
                            transition-all
                            overflow-hidden
                        "
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setSelfieFile(
                                        e.target.files?.[0] || null
                                    )
                                }
                            />

                            {!selfieFile ? (
                                <>
                                    <p className="text-sm font-medium text-slate-700">
                                        Upload Selfie
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Clear face photo
                                    </p>
                                </>
                            ) : (
                                <img
                                    src={URL.createObjectURL(selfieFile)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </label>

                        {errors.selfie && (
                            <p className="text-xs text-red-500">
                                {errors.selfie}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
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
                "
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting...
                        </div>
                    ) : (
                        "Complete Registration"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Step3UploadKYCWorker;
