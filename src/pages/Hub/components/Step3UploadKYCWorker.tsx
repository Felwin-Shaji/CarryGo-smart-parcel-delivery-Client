import { useState } from "react";
import { useHubAddWorker } from "../../../Services/Hub/HubAddWorkers";

interface Step3Props {
    formData: {
        name: string;
        email: string;
        mobile: string;
        role: "worker";
    };
    tempWorkerId: string | null;
}

const Step3UploadKYCWorker = ({ formData, tempWorkerId }: Step3Props) => {
    const { uploadKyc } = useHubAddWorker();

    const [idType, setIdType] = useState("AADHAAR");
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!documentFile || !selfieFile) {
            alert("Please upload both document and selfie.");
            return;
        }

        const payload = new FormData();
        payload.append("idType", idType);
        payload.append("document", documentFile);
        payload.append("selfie", selfieFile);
        payload.append("tempWorkerId", tempWorkerId!);
        payload.append("email", formData.email);

        setLoading(true);
        const res = await uploadKyc(payload);
        setLoading(false);

        if (res.success) {
            localStorage.removeItem("otpWorkerMeta");
            alert("Worker created successfully!");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 border rounded-xl shadow-lg space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-blue-900">
                    Worker KYC Verification
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                    Upload the worker’s identity document and a selfie for verification.
                </p>
            </div>

            {/* ID TYPE */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    Select KYC Document Type
                </label>
                <select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="px-4 py-2 border rounded-md bg-white"
                >
                    <option value="AADHAAR">Aadhaar</option>
                    <option value="DL">Driving License</option>
                    <option value="PASSPORT">Passport</option>
                </select>
            </div>

            {/* DOCUMENT UPLOAD */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                    Upload Document
                </label>
                <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                    className="border p-2 rounded-md"
                />
            </div>

            {/* SELFIE UPLOAD */}
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Upload Selfie</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
                    className="border p-2 rounded-md"
                />
            </div>

            {/* SUBMIT BUTTON */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-md font-semibold"
            >
                {loading ? "Submitting..." : "Submit KYC"}
            </button>
        </div>
    );
};

export default Step3UploadKYCWorker;
