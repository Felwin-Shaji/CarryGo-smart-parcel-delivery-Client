import { X } from "lucide-react";

const FilePreview = ({ file, onRemove }: any) => {
    if (!file) return null;

    const isImg = typeof file === "string"
      ? file.match(/\.(jpg|jpeg|png)$/i)
      : file?.type?.startsWith("image/");

    const fileURL =
      typeof file === "string" ? file : URL.createObjectURL(file);

    return (
      <div className="relative mt-4 w-full">
        {/* REMOVE BUTTON */}
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-3 -right-3 bg-black text-white rounded-full p-2 shadow hover:bg-red-600 z-10"
        >
          <X size={16} />
        </button>

        {/* IMAGE PREVIEW */}
        {isImg ? (
          <img
            src={fileURL}
            className="w-full max-h-[380px] rounded-xl object-contain border shadow-lg bg-white p-3"
          />
        ) : (
          /* PDF PREVIEW BUTTON */
          <a
            href={fileURL}
            target="_blank"
            className="block w-full bg-gray-100 border rounded-xl p-6 text-center shadow-lg font-semibold text-blue-700 underline"
          >
            View PDF Document
          </a>
        )}
      </div>
    );
  };

  export default FilePreview;