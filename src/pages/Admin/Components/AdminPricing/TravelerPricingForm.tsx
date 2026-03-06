import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import type { TravelerPricingFormType } from "../../../../constants_Types/types/BaseTypes/baseAdminPricinPolicy.Dto";
import { useAdminPricingPolicy } from "../../../../Services/Admin/AdminPricingPolicy";
import type { TravelerPricingPolicyResponseDTO } from "../../../../constants_Types/types/Admin/PricingPolicy.dto";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import LoadingScreen from "../../../../components/loading/CarryGoLoadingScreen";

const travelerPricingSchema = Yup.object({
  basePrice: Yup.number().min(0).required(),

  pricePerKm: Yup.number().min(0).required(),

  basePricePerKg: Yup.number().min(1).required(),

  transportMultipliers: Yup.object({
    FLIGHT: Yup.number().min(0.1).required(),
    TRAIN: Yup.number().min(0.1).required(),
    CAR: Yup.number().min(0.1).required(),
    BUS: Yup.number().min(0.1).required(),
    BIKE: Yup.number().min(0.1).required(),
  }),

  platformFeePercent: Yup.number().min(0).max(100).required(),
});


export default function AdminTravelerPricing() {
  const { createAdminTravelerPricing, getAdminTravelerPricing } = useAdminPricingPolicy();
  const [editMode, setEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);


  const [policyResponse, setPolicyResponse] =
    useState<TravelerPricingPolicyResponseDTO | null>(null);


  const initialValues: TravelerPricingFormType | null = policyResponse
    ? {
      basePrice: policyResponse.basePrice,
      pricePerKm: policyResponse.pricePerKm,

      basePricePerKg: policyResponse.basePricePerKg,

      transportMultipliers: {
        FLIGHT: policyResponse.transportMultipliers.FLIGHT,
        TRAIN: policyResponse.transportMultipliers.TRAIN,
        CAR: policyResponse.transportMultipliers.CAR,
        BUS: policyResponse.transportMultipliers.BUS,
        BIKE: policyResponse.transportMultipliers.BIKE,
      },

      platformFeePercent: policyResponse.platformFeePercent,
    }
    : null;

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await getAdminTravelerPricing();
        setPolicyResponse(data);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  if (loading || !initialValues) {
    return (
      <DashboardProvider role="admin">
        <DashboardLayout pageTitle="Pricing Policy">
          <LoadingScreen />
        </DashboardLayout>
      </DashboardProvider>
    );
  }


  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">
          Traveler Pricing Policy
        </h1>
        <p className="text-gray-500 mt-1">
          Define how travelers earn while delivering parcels.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={travelerPricingSchema}
        onSubmit={async (values) => {
          try {
            setSubmitLoading(true);
            console.log(values);
            await createAdminTravelerPricing(values);
            setEditMode(false);
          } finally {
            setSubmitLoading(false);
          }
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-8">

            {/* Base Price Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

              <SectionTitle
                title="Base Price"
                description="Base earning per kilogram for travelers."
              />

              <FormField
                label="Base Price (₹)"
                name="basePrice"
                disabled={!editMode}
              />

              <FormField
                label="Price Per Km (₹ / km)"
                name="pricePerKm"
                disabled={!editMode}
              />

              <FormField
                label="Base Price Per Kg (₹ / kg)"
                name="basePricePerKg"
                disabled={!editMode}
              />
            </div>

            {/* Transport Multiplier Card */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

              <SectionTitle
                title="Transport Mode Multipliers"
                description="Adjust earnings based on transport type."
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField label="Flight" name="transportMultipliers.FLIGHT" disabled={!editMode} />
                <FormField label="Train" name="transportMultipliers.TRAIN" disabled={!editMode} />
                <FormField label="Car" name="transportMultipliers.CAR" disabled={!editMode} />
                <FormField label="Bus" name="transportMultipliers.BUS" disabled={!editMode} />
                <FormField label="Bike" name="transportMultipliers.BIKE" disabled={!editMode} />
              </div>
            </div>

            {/* Platform Fee */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">

              <SectionTitle
                title="Platform Commission"
                description="Percentage commission deducted by CarryGo."
              />

              <FormField
                label="Platform Fee (%)"
                name="platformFeePercent"
                disabled={!editMode}
              />
            </div>

            {/* Action Bar */}
            <div className="sticky bottom-0 bg-white border-t py-4 flex justify-between">

              {!editMode ? (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="text-sm border rounded-lg px-4 py-2"
                >
                  Edit Traveler Pricing
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="text-sm border rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              )}

              {editMode && (
                <button
                  type="submit"
                  disabled={!dirty || !isValid || submitLoading}
                  className="text-sm bg-primary text-white rounded-lg px-6 py-2 disabled:opacity-50"
                >
                  {submitLoading ? "Saving..." : "Publish New Policy"}
                </button>
              )}
            </div>

          </Form>
        )}
      </Formik>
    </>
  );
}

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{description}</p>
  </div>
);

const FormField = ({
  label,
  name,
  disabled,
}: {
  label: string;
  name: string;
  disabled: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
    <Field
      name={name}
      type="number"
      disabled={disabled}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
    />
    <ErrorMessage
      name={name}
      component="p"
      className="text-red-500 text-xs mt-1"
    />
  </div>
);