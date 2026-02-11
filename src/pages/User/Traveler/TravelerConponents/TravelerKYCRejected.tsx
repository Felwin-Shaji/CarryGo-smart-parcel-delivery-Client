import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTravelerKyc } from "../../../../Services/User/Traveler/TravelerKyc";
import { Header } from "../../components/Header";

type IdType = "AADHAAR" | "DL" | "PASSPORT";

export interface ExistingKyc {
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

const TravelerKycResubmit = () => {
  const { reSubmitKyc, getMyKyc } = useTravelerKyc();
  const navigate = useNavigate();

  const [existingKyc, setExistingKyc] = useState<ExistingKyc | null>(null);

  const [idType, setIdType] = useState<IdType>("AADHAAR");
  const [idNumber, setIdNumber] = useState("");

  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const [removeDocument, setRemoveDocument] = useState(false);
  const [removeSelfie, setRemoveSelfie] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  /* 🔹 Fetch existing KYC */
  useEffect(() => {
    (async () => {
      const res = await getMyKyc();
      setExistingKyc(res);
      setIdType(res.idType);
      setIdNumber(res.idNumber);
    })();
  }, []);

  const validate = (): Errors => {
    const err: Errors = {};

    if (!idNumber.trim()) {
      err.idNumber = `${idType} number is required`;
    } else if (idType === "AADHAAR" && !/^\d{12}$/.test(idNumber)) {
      err.idNumber = "Aadhaar must be 12 digits";
    } else if (idType === "PASSPORT" && !/^[A-Z0-9]{8,9}$/.test(idNumber)) {
      err.idNumber = "Invalid passport number";
    } else if (idType === "DL" && idNumber.length < 10) {
      err.idNumber = "Invalid driving license number";
    }

    if (!documentFile && !existingKyc?.documentUrl && !removeDocument) {
      err.document = "Document required";
    }

    if (!selfieFile && !existingKyc?.selfieUrl && !removeSelfie) {
      err.selfie = "Selfie required";
    }

    return err;
  };

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

      console.log(formData.get("idType"), formData.get("idNumber"), formData.get("document"), formData.get("selfie"));

      await reSubmitKyc(formData);
      navigate("/traveler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header isLoggedIn />
      <div>
        <div className="max-w-xl mx-auto bg-white p-8 border rounded-xl shadow space-y-6">

          <div>
            <h2 className="text-2xl font-bold text-red-600">
              Resubmit KYC Verification
            </h2>

            {existingKyc?.rejectionReason && (
              <div className="mt-3 border border-red-300 bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                <p className="font-semibold">Reason for rejection</p>
                <p className="mt-1">{existingKyc.rejectionReason}</p>
              </div>
            )}
          </div>

          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value as IdType)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="AADHAAR">Aadhaar</option>
            <option value="DL">Driving License</option>
            <option value="PASSPORT">Passport</option>
          </select>

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

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Resubmitting..." : "Resubmit KYC"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TravelerKycResubmit;



import { X } from "lucide-react";

interface Props {
  title: string;
  existingUrl?: string;
  file: File | null;
  error?: string;
  onFile: (f: File | null) => void;
  onRemove: () => void;
  round?: boolean;
}

export const FileSection = ({
  title,
  existingUrl,
  file,
  error,
  onFile,
  onRemove,
  round = false,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setRemoved(false);
      return () => URL.revokeObjectURL(url);
    }

    if (!removed && existingUrl) {
      setPreview(existingUrl);
    } else {
      setPreview(null);
    }
  }, [file, existingUrl, removed]);

  const handleRemove = () => {
    setRemoved(true);
    setPreview(null);
    onRemove();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{title}</label>

      <div className="flex justify-center">
        {preview && (
          <div
            className={`relative ${
              round ? "w-32 h-32" : "w-full max-w-md h-40"
            }`}
          >
            <img
              src={preview}
              className={`w-full h-full border object-cover ${
                round ? "rounded-full" : "rounded-lg"
              }`}
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black transition"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
        className="w-full border p-2 rounded"
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};