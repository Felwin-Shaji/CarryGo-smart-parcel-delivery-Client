import { useState } from "react";
import FormRow from "./PackageDetailsComponents/FormRow";
import { Segment, SegmentGroup } from "./PackageDetailsComponents/SegmentGroup";

type PackageSize = "SMALL" | "MEDIUM" | "LARGE";
type PackageCategory =
  | "DOCUMENTS"
  | "FRAGILE"
  | "FOOD"
  | "ELECTRONICS"
  | "OTHER";

const PackageDetailsStep = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const [category, setCategory] = useState<PackageCategory | null>(null);
  const [size, setSize] = useState<PackageSize | null>(null);
  const [weightKg, setWeightKg] = useState<number>(1);

  const canContinue = category && size && weightKg > 0;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-6 py-7">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Package details
          </h2>
          <p className="text-sm text-gray-500">
            Required for pricing & routing
          </p>
        </div>

        {/* CATEGORY */}
        <FormRow label="Category">
          <SegmentGroup>
            <Segment value={category} setValue={setCategory} id="DOCUMENTS" />
            <Segment value={category} setValue={setCategory} id="FRAGILE" />
            <Segment value={category} setValue={setCategory} id="FOOD" />
            <Segment value={category} setValue={setCategory} id="ELECTRONICS" />
            <Segment value={category} setValue={setCategory} id="OTHER" />
          </SegmentGroup>
        </FormRow>

        {/* SIZE */}
        <FormRow label="Size">
          <SegmentGroup>
            <Segment value={size} setValue={setSize} id="SMALL" />
            <Segment value={size} setValue={setSize} id="MEDIUM" />
            <Segment value={size} setValue={setSize} id="LARGE" />
          </SegmentGroup>
        </FormRow>

        {/* WEIGHT */}
        <FormRow label="Weight (kg)">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0.5}
              max={25}
              step={0.5}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="flex-1"
            />
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-20 border rounded-lg px-2 py-1 text-sm"
            />
          </div>
        </FormRow>

        {/* CTA */}
        <button
          disabled={!canContinue}
          onClick={onSuccess}
          className={`mt-6 w-full py-3 rounded-xl text-sm font-semibold
            ${
              canContinue
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PackageDetailsStep;
