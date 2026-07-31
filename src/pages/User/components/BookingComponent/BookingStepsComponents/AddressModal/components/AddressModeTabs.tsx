import { MapPinned, MapPinHouse } from "lucide-react";

interface AddressModeTabsProps {
    mode: "SAVED" | "MAP";
    setMode: (mode: "SAVED" | "MAP") => void;
}

const AddressModeTabs = ({
    mode,
    setMode,
}: AddressModeTabsProps) => {
    return (
        <div className="px-8 py-3">
            <div className="inline-flex items-center rounded-xl bg-slate-100 p-1">

                <button
                    type="button"
                    onClick={() => setMode("SAVED")}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 ${mode === "SAVED"
                            ? "bg-[#102467] text-white shadow-sm"
                            : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                >
                    <MapPinHouse size={16} />
                    <span>Saved</span>
                </button>

                <button
                    type="button"
                    onClick={() => setMode("MAP")}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition-all duration-200 ${mode === "MAP"
                            ? "bg-[#102467] text-white shadow-sm"
                            : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                >
                    <MapPinned size={16} />
                    <span>Map</span>
                </button>

            </div>
        </div>
    );
};

export default AddressModeTabs;