import { useState, useEffect } from "react";

interface ResubmitUploadFormProps {
    isSubmitting: boolean;
    imageValue: File | string | null;
    onImageChange: (value: File | string | null) => void;
    onBack: () => void;
    onCancel: () => void;
    onFinish: () => void;
}

export default function ResubmitUploadForm({
    isSubmitting,
    imageValue,
    onImageChange,
    onBack,
    onCancel,
    onFinish
}: ResubmitUploadFormProps) {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (!imageValue) {
            setPreview("");
            return;
        }

        if (typeof imageValue === "string") {
            setPreview(imageValue);
        } else if (imageValue instanceof File) {
            const objectUrl = URL.createObjectURL(imageValue);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageValue]);

    const handleFileChange = (file: File | null) => {
        onImageChange(file);
    };

    const handleClearImage = () => {
        onImageChange(null);
    };

    return (
        <div
            className="p-8 border bg-white space-y-6 max-w-2xl mx-auto"
            style={{
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-base)",
            }}
        >
            <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--color-primary)" }}>
                    Verification Proof Documents
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                    Please upload clean images showing full operational address coordinates explicitly.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-700 font-semibold">
                    {preview ? "Current Verification Document" : "Upload Verification Image File"}
                </label>

                {/* Show file selector input only if no valid preview exists */}
                {!preview ? (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-5 file:text-indigo-700 hover:file:bg-indigo-10 cursor-pointer"
                    />
                ) : (
                    <div className="relative w-full max-w-md aspect-video mt-2 group border rounded-lg overflow-hidden bg-slate-50">
                        <img
                            src={preview}
                            alt="Verification Document Status"
                            className="w-full h-full object-contain"
                        />
                        
                        {/* Interactive Clear Button */}
                        <button
                            type="button"
                            onClick={handleClearImage}
                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white text-sm font-bold shadow-md bg-red-600 hover:bg-red-700 rounded-full transition-transform active:scale-95"
                            title="Remove image to upload a new one"
                        >
                            ✕
                        </button>

                        {/* Visual Badge Indicator overlay */}
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-[10px] text-white rounded font-medium">
                            {typeof imageValue === "string" ? "Stored Document" : "New Selection"}
                        </div>
                    </div>
                )}
            </div>

            {/* Actions Bar Panel */}
            <div className="flex gap-3 pt-6 border-t">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                    Back to Address
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2.5 text-sm font-semibold border text-gray-600 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onFinish}
                    disabled={isSubmitting || !imageValue}
                    className="flex-1 py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    {isSubmitting ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Updating Records...
                        </>
                    ) : (
                        "Submit Updated KYC Profile"
                    )}
                </button>
            </div>
        </div>
    );
}