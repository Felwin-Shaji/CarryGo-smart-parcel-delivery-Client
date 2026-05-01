import { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useAgency } from "../../../../../Services/Agency/Agency";
import type { HubResponseDTO } from "../../../../../shared/constants_Types/types/Admin/AdminAgency.dto";


interface Props {
    label: string;
    selected: HubResponseDTO | null;
    onSelect: (hub: HubResponseDTO) => void;
    placeholder: string;
}

export function HubDropdown({ label, selected, onSelect, placeholder }: Props) {

    const { getAllHubs } = useAgency();

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<HubResponseDTO[]>([]);
    const [loading, setLoading] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await getAllHubs({ search, limit: 20, page: 1 });
                setResults(res.data ?? res.data ?? []);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [search, open]);


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleToggle = () => {
        setOpen(v => !v);
        setSearch("");
    };

    const handleSelect = (hub: HubResponseDTO) => {
        onSelect(hub);
        setOpen(false);
        setSearch("");
    };

    return (
        <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                {label}
            </p>

            <div ref={containerRef} className="relative">

                {/* ── Trigger ── */}
                <button
                    type="button"
                    onClick={handleToggle}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition text-left cursor-pointer"
                    style={{
                        backgroundColor: "#ffffff",
                        border: open ? "1.5px solid #1E3A8A" : "1.5px solid #E5E7EB",
                        boxShadow: open ? "0 0 0 3px rgba(30,58,138,0.08)" : "none",
                    }}
                >
                    {selected ? (
                        <>
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "#EEF2FF", border: "1px solid #C7D2FE" }}>
                                <MapPin size={13} style={{ color: "#1E3A8A" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm leading-tight truncate" style={{ color: "#111827" }}>
                                    {selected.name}
                                </p>
                                <p className="text-[11px]" style={{ color: "#9CA3AF" }}>
                                    {selected.address.pincode} · {selected.address.city}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "#F3F4F6" }}>
                                <MapPin size={13} style={{ color: "#9CA3AF" }} />
                            </div>
                            <span style={{ color: "#9CA3AF" }} className="flex-1">{placeholder}</span>
                        </>
                    )}
                    <ChevronDown
                        size={15}
                        style={{ color: "#9CA3AF", flexShrink: 0 }}
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                    <ChevronDown
                        size={15}
                        className={`text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </button>

                {/* ── Dropdown panel ── */}
                {open && (
                    <div className="absolute z-[999] top-full mt-1.5 left-0 right-0 rounded-xl shadow-lg overflow-hidden"
                        style={{ backgroundColor: "#ffffff", border: "1px solid #E5E7EB" }}>
                        {/* Search input */}
                        <div className="p-2 border-b border-gray-100">
                            <div className="relative">
                                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search hubs..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Results list */}
                        <div className="max-h-44 overflow-y-auto">
                            {loading && (
                                <p className="text-xs text-gray-400 text-center py-4">Searching...</p>
                            )}

                            {!loading && results.length === 0 && (
                                <p className="text-xs text-gray-400 text-center py-4">
                                    {search ? `No hubs found for "${search}"` : "No hubs available"}
                                </p>
                            )}

                            {!loading && results.map(h => (
                                <button
                                    key={h.id}
                                    type="button"
                                    onClick={() => handleSelect(h)}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 transition text-left border-b border-gray-100 last:border-0 cursor-pointer bg-white hover:bg-gray-50 ${selected?.id === h.id ? "bg-[#EEF2FF]" : ""
                                        }`}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: "#EEF2FF", border: "1px solid #C7D2FE" }}>
                                        <MapPin size={12} style={{ color: "#1E3A8A" }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 leading-tight truncate">
                                            {h.name}
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                            {h.address.pincode} · {h.address.city}
                                        </p>
                                    </div>
                                    {selected?.id === h.id && (
                                        <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: "#1E3A8A" }}>
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}