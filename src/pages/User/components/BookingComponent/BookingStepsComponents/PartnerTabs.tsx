interface Props {
  tab: "AGENCIES" | "TRAVELERS";
  setTab: (tab: "AGENCIES" | "TRAVELERS") => void;
}

const PartnerTabs = ({
  tab,
  setTab,
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
        Agencies
      </button>

      <button
        onClick={() => setTab("TRAVELERS")}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          tab === "TRAVELERS"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        Travelers
      </button>
    </div>
  );
};

export default PartnerTabs;