import AddressTimelineItem from "./AddressComponents/AddressTimelineItem";
import AddressBottomSheet from "./AddressComponents/AddressBottomSheet";
import { useState } from "react";


export interface Address {
  id: string;
  label: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

const AddressStep = ({ onSuccess }: { onSuccess: () => void }) => {
  const [active, setActive] = useState<"from" | "to" | null>(null);
  const [from, setFrom] = useState<Address | null>(null);
  const [to, setTo] = useState<Address | null>(null);

  const canContinue = from && to && from.id !== to.id;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800">
        Delivery Route
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Select pickup and drop locations
      </p>

      {/* Timeline */}
      <div className="mt-10 space-y-6">
        <AddressTimelineItem
          title="Pickup Location"
          address={from}
          active={active === "from"}
          onClick={() => setActive("from")}
        />

        <div className="ml-5 h-6 w-px bg-gray-300" />

        <AddressTimelineItem
          title="Delivery Location"
          address={to}
          active={active === "to"}
          onClick={() => setActive("to")}
        />
      </div>

      {/* CTA */}
      <button
        disabled={!canContinue}
        onClick={onSuccess}
        className={`mt-10 w-full py-3 rounded-xl text-white font-semibold
          ${
            canContinue
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-300 cursor-not-allowed"
          }
        `}
      >
        Continue
      </button>

      {/* Bottom Sheet */}
      {active && (
        <AddressBottomSheet
          excludeId={active === "from" ? to?.id : from?.id}
          onSelect={(addr) => {
            active === "from" ? setFrom(addr) : setTo(addr);
            setActive(null);
          }}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
};

export default AddressStep;

/////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////


