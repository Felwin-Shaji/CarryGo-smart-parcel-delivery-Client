import { Field, ErrorMessage, useFormikContext } from "formik";
import { Box } from "lucide-react";
import { useEffect } from "react";
import SectionCard from "./SectionCard";

const CapacitySection = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  const { maxLengthCm, maxWidthCm, maxHeightCm } =
    values.allowedPackageDimensions || {};

  // Auto calculate volume
  useEffect(() => {
    if (maxLengthCm && maxWidthCm && maxHeightCm) {
      const volume = maxLengthCm * maxWidthCm * maxHeightCm;
      setFieldValue("totalVolumeCm3", volume);
    }
  }, [maxLengthCm, maxWidthCm, maxHeightCm, setFieldValue]);

  return (
    <SectionCard
      icon={<Box size={18} />}
      title="CARRYING CAPACITY"
      subtitle="Define how much parcel space you can carry"
    >
      {/* MAX WEIGHT */}
      <div className="space-y-2 mb-6">
        <label className="text-xs font-semibold uppercase text-gray-500">
          Max Weight (Kg) *
        </label>

        <Field
          type="number"
          name="capacityKg"
          placeholder="e.g. 10"
          className="w-full border rounded-xl px-4 py-3"
        />

        <ErrorMessage
          name="capacityKg"
          component="p"
          className="text-red-500 text-xs"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-6">

        <p className="text-xs font-semibold text-gray-500 uppercase mb-4">
          Available Package Space
        </p>

        {/* Dimensions */}
        <div className="grid grid-cols-3 gap-4">

          {/* LENGTH */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase">
              Length (cm) *
            </label>

            <Field
              type="number"
              name="allowedPackageDimensions.maxLengthCm"
              placeholder="L"
              className="w-full border rounded-xl px-4 py-3"
            />

            <ErrorMessage
              name="allowedPackageDimensions.maxLengthCm"
              component="p"
              className="text-red-500 text-xs"
            />
          </div>

          {/* WIDTH */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase">
              Width (cm) *
            </label>

            <Field
              type="number"
              name="allowedPackageDimensions.maxWidthCm"
              placeholder="W"
              className="w-full border rounded-xl px-4 py-3"
            />

            <ErrorMessage
              name="allowedPackageDimensions.maxWidthCm"
              component="p"
              className="text-red-500 text-xs"
            />
          </div>

          {/* HEIGHT */}
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase">
              Height (cm) *
            </label>

            <Field
              type="number"
              name="allowedPackageDimensions.maxHeightCm"
              placeholder="H"
              className="w-full border rounded-xl px-4 py-3"
            />

            <ErrorMessage
              name="allowedPackageDimensions.maxHeightCm"
              component="p"
              className="text-red-500 text-xs"
            />
          </div>

        </div>

        {/* Auto Calculated Volume */}
        <div className="mt-4 text-sm text-gray-500">
          Calculated Volume:{" "}
          <span className="font-semibold text-gray-800">
            {values.totalVolumeCm3 || 0} cm³
          </span>
        </div>

      </div>
    </SectionCard>
  );
};

export default CapacitySection;