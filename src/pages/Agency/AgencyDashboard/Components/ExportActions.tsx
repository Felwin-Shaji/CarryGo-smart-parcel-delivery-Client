import {
    FileSpreadsheet,
    FileText,
} from "lucide-react";

type Props = {
    onExport: (
        type: "excel" | "pdf"
    ) => Promise<void>;
};

const ExportActions = ({
    onExport,
}: Props) => {
    return (
        <div className="flex items-center justify-end gap-3">
            {/* EXCEL */}
            <button
                onClick={() => onExport("excel")}
                className="
                    group
                    inline-flex items-center gap-2
                    rounded-xl
                    border border-emerald-200
                    bg-emerald-50
                    px-4
                    text-sm font-medium
                    text-emerald-700
                    transition-all duration-200
                    hover:bg-emerald-100
                    hover:border-emerald-300
                    hover:shadow-sm
                    active:scale-[0.98]
                    "
            >
                <div
                    className="
                        flex items-center justify-center
                        w-8 h-5
                        rounded-lg
                        bg-emerald-100
                        text-emerald-700
                        transition-transform duration-200
                        group-hover:scale-105
                    "
                >
                    <FileSpreadsheet className="w-3 h-3" />
                </div>

                <span>Export Excel</span>
            </button>

            {/* PDF */}
            <button
                onClick={() => onExport("pdf")}
                className="
                    group
                    inline-flex items-center gap-2
                    rounded-xl
                    border border-rose-200
                    bg-rose-50
                    px-4 py-2.5
                    text-sm font-medium
                    text-rose-700
                    transition-all duration-200
                    hover:bg-rose-100
                    hover:border-rose-300
                    hover:shadow-sm
                    active:scale-[0.98]
                    "
            >
                <div
                    className="
                        flex items-center justify-center
                        w-8 h-5
                        rounded-lg
                        bg-rose-100
                        text-rose-700
                        transition-transform duration-200
                        group-hover:scale-105
                    "
                >
                    <FileText className="w-3 h-3" />
                </div>

                <span>Export PDF</span>
            </button>
        </div>
    );
};

export default ExportActions;