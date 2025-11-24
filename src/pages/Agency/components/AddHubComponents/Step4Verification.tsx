import type { AddHubPayload } from "../../AgencyAddHubs";
import { useState } from "react";
import { useAgencyAddHub } from "../../../../Services/Agency/AgencyAddHub";

interface Step4Props {
    formData: AddHubPayload;
    tempHubId: string | null;
}

const Step4Verification = ({ formData, tempHubId }: Step4Props) => {

    const {finalRegister} = useAgencyAddHub()
    const [preview, setPreview] = useState<string>("");

    const handleImageChange = (file: File | null) => {
        formData.verificationImage = file;

        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else {
            setPreview("");
        }
    };

    const handleSubmit = async () => {
        const success = await finalRegister(formData, tempHubId);

        if (success) {
            localStorage.removeItem("otpHubMeta");
            console.log("Hub registration completed");
        }
    };

    return (
        <div
            className="max-w-xl mx-auto p-8 border space-y-6"
            style={{
                backgroundColor: "white",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-base)",
            }}
        >
            {/* HEADER */}
            <h2
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
            >
                Verification Document
            </h2>

            <p className="text-gray-600 text-sm">
                Upload a valid verification document for this hub.
            </p>

            {/* UPLOAD SECTION */}
            <div className="flex flex-col gap-3">
                <label className="text-sm text-gray-700 font-medium">
                    Verification Image
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                    className="cursor-pointer"
                />

                {preview && (
                    <div className="relative w-40 h-40 mt-3">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg border"
                        />

                        {/* REMOVE IMAGE BUTTON */}
                        <button
                            type="button"
                            onClick={() => handleImageChange(null)}
                            className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center text-white"
                            style={{
                                backgroundColor: "var(--color-primary)",
                                borderRadius: "999px",
                                boxShadow: "var(--shadow-base)",
                            }}
                        >
                            ✕
                        </button>
                    </div>
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
                onClick={handleSubmit}
                className="w-full py-3 text-white font-semibold"
                style={{
                    backgroundColor: "var(--color-primary)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-base)",
                }}
            >
                Finish Registration
            </button>
        </div>
    );
};

export default Step4Verification;
