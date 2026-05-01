type TabItem<T extends string> = {
    key: T;
    label: string;
};

type SecondaryHeaderProps<T extends string> = {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    tabs?: TabItem<T>[];
    activeTab?: T;
    onTabChange?: (tab: T) => void;
};

export function SecondaryHeader<T extends string>({
    title,
    showBack = false,
    onBack,
    tabs = [],
    activeTab,
    onTabChange,
}: SecondaryHeaderProps<T>) {
    return (
        <div className="bg-[#132A4C] border-b border-[#1E3A8A] px-6 py-2">

            <div className="flex items-center justify-between">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                    {showBack && (
                        <button
                            onClick={onBack}
                            className="px-3 py-1 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white transition"
                        >
                            ← Back
                        </button>
                    )}

                    {title && (
                        <h2 className="text-sm font-semibold text-white/90">
                            {title}
                        </h2>
                    )}
                </div>

                {/* RIGHT SIDE (TABS) */}
                {tabs.length > 0 && (
                    <div className="flex bg-white/10 p-1 rounded-lg backdrop-blur">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => onTabChange?.(tab.key)}
                                className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all
                                    ${activeTab === tab.key
                                        ? "bg-white text-[#0B1C44] shadow"
                                        : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}