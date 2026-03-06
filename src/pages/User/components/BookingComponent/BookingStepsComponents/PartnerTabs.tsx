interface Props {
  tab: "AGENCIES" | "TRAVELERS";
  setTab: (tab: "AGENCIES" | "TRAVELERS") => void;
  agenciesCount: number;
  travelersCount: number;
}

const PartnerTabs = ({
  tab,
  setTab,
  agenciesCount,
  travelersCount,
}: Props) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTab("AGENCIES")}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          tab === "AGENCIES"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        Agencies ({agenciesCount})
      </button>

      <button
        onClick={() => setTab("TRAVELERS")}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          tab === "TRAVELERS"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        Travelers ({travelersCount})
      </button>
    </div>
  );
};

export default PartnerTabs;