import { useState } from "react";
import { useTravelerKyc } from "../../../Services/User/Traveler/TravelerKyc";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";


interface TravelerKycErrors {
    idNumber?: string;
    document?: string;
    selfie?: string;
}

const TravelerKyc = () => {
    const { submitKyc } = useTravelerKyc();
    const navigate = useNavigate();


    const [idType, setIdType] = useState("AADHAAR");
    const [idNumber, setIdNumber] = useState("");
    const [documentFile, setDocumentFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<TravelerKycErrors>({});

    const validateIdNumber = () => {
        if (!idNumber.trim()) return `${idType} number is required`;

        if (idType === "AADHAAR" && !/^[0-9]{12}$/.test(idNumber)) {
            return "Aadhaar number must be exactly 12 digits";
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

            console.log("Preparing KYC payload:", payload);
            payload.append("idType", idType);
            payload.append("idNumber", idNumber);
            payload.append("document", documentFile!);
            payload.append("selfie", selfieFile!);

            await submitKyc(payload);
            navigate("/traveler");
        } finally {
            setLoading(false);
        }
    }



    return (<>

        <Header isLoggedIn={true} />
        <div className="pt-20 mt-10 ">

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
                        onChange={(e) => {
                            setIdType(e.target.value);
                            setIdNumber("");
                            setErrors((prev) => ({ ...prev, idNumber: undefined }));
                        }}
                        className="px-4 py-2 border rounded-md bg-white"
                    >
                        <option value="AADHAAR">Aadhaar</option>
                        <option value="DL">Driving License</option>
                        <option value="PASSPORT">Passport</option>
                    </select>
                </div>

                {/* ID NUMBER */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                        {idType} Number
                    </label>

                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => {
                            setIdNumber(e.target.value);
                            setErrors((prev) => ({ ...prev, idNumber: undefined }));
                        }}
                        placeholder={`Enter ${idType} number`}
                        className={`px-4 py-2 border rounded-md ${errors.idNumber ? "border-red-500" : ""
                            }`}
                    />

                    {errors.idNumber && (
                        <p className="text-sm text-red-600">{errors.idNumber}</p>
                    )}
                </div>



                {/* DOCUMENT UPLOAD */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Upload Document</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                        className="border p-2 rounded-md"
                    />

                    {documentFile && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500">Preview:</p>
                            {documentFile.type.includes("pdf") ? (
                                <embed
                                    src={URL.createObjectURL(documentFile)}
                                    className="w-full h-40 border rounded"
                                />
                            ) : (
                                <img
                                    src={URL.createObjectURL(documentFile)}
                                    alt="Document Preview"
                                    className="w-full h-40 object-cover border rounded"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* SELFIE UPLOAD */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Upload Selfie</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
                        className="border p-2 rounded-md"
                    />

                    {selfieFile && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500">Preview:</p>
                            <img
                                src={URL.createObjectURL(selfieFile)}
                                alt="Selfie Preview"
                                className="w-32 h-32 object-cover border rounded-full mx-auto"
                            />
                        </div>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-md font-semibold"
                >
                    {loading ? "Submitting..." : "Submit KYC"}
                </button>
            </div>
        </div>
    </>
    );
};

export default TravelerKyc;
