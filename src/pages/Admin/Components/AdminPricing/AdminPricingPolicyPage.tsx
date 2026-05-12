import { Formik, Form, Field, ErrorMessage } from "formik";
import { pricingPolicySchema } from "../../../../validation/pricingPolicySchema";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { useEffect, useState } from "react";
import type { PricingPolicyResponseDTO } from "../../../../shared/constants_Types/types/Admin/PricingPolicy.dto";
import { useAdminPricingPolicy } from "../../../../Services/Admin/AdminPricingPolicy";
import LoadingScreen from "../../../../shared/components/loading/CarryGoLoadingScreen";
import type { PricingPolicyFormDTO } from "../../../../shared/constants_Types/types/BaseTypes/baseAdminPricinPolicy.Dto";

export default function AdminAgencyPricing() {

  const { getAdminAgencyPricing, createAdminAgencyPricing } = useAdminPricingPolicy();

  const [editMode, setEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);


  const [policyResponse, setPolicyResponse] =
    useState<PricingPolicyResponseDTO | null>(null);

  const formInitialValues: PricingPolicyFormDTO | null =
    policyResponse
      ? {
        minBasePrice: policyResponse.minBasePrice,
        maxBasePrice: policyResponse.maxBasePrice,

        minPricePerKm: policyResponse.minPricePerKm,
        maxPricePerKm: policyResponse.maxPricePerKm,

        minPricePerKg: policyResponse.minPricePerKg,
        maxPricePerKg: policyResponse.maxPricePerKg,

        platformFeePercent: policyResponse.platformFeePercent,
      }
      : null;



  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await getAdminAgencyPricing();
        setPolicyResponse(data);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  if (loading || !formInitialValues) {
    return (
      <DashboardProvider role="admin">
        <DashboardLayout pageTitle="Pricing Policy">
          <LoadingScreen />
        </DashboardLayout>
      </DashboardProvider>
    );
  }


  return (
    // <DashboardProvider role="admin">
    //   <DashboardLayout pageTitle="Pricing Policy">
    <div className="container max-w-5xl">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Pricing Policy</h1>
        <p className="text-gray-600 mt-1">
          Define guardrails for agency pricing. Agencies must stay within
          these limits.
        </p>
        {policyResponse && (
          <p className="text-xs text-gray-500 mb-4">
            Active Policy Version: v{policyResponse.policyVersion}
          </p>
        )}

      </div>

      {editMode && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 mb-6">
          ⚠️ <strong>Publishing a new pricing policy</strong><br />
          This will create a <b>new policy version</b>.
          All agencies must review and update their pricing before accepting new bookings.
        </div>
      )}


      <Formik<PricingPolicyFormDTO>
        initialValues={formInitialValues!}
        enableReinitialize
        validateOnMount
        validationSchema={pricingPolicySchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitLoading(true);
            const newPolicy = await createAdminAgencyPricing(values);
            setPolicyResponse(newPolicy);
            setEditMode(false);
          } finally {
            setSubmitLoading(false);
            setSubmitting(false);
          }
        }}

      >


        {({ isValid, dirty, resetForm }) => (

          <Form className="space-y-8">

            {/* Pricing Limits Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">

              <PricingSection
                title="Base Price"
                description="Fixed starting charge applied to every delivery"
                unit="₹"
              >
                <RangeField
                  minName="minBasePrice"
                  maxName="maxBasePrice"
                  disabled={!editMode}
                />
              </PricingSection>

              <PricingSection
                title="Distance Charge"
                description="Allowed price range per kilometer"
                unit="₹ / km"
              >
                <RangeField
                  minName="minPricePerKm"
                  maxName="maxPricePerKm"
                  disabled={!editMode}
                />
              </PricingSection>

              <PricingSection
                title="Weight Pricing"
                description="Allowed price range per kilogram of parcel weight"
                unit="₹ / kg"
              >
                <RangeField
                  minName="minPricePerKg"
                  maxName="maxPricePerKg"
                  disabled={!editMode}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chargeable weight = max(actual weight, volumetric weight)
                </p>
              </PricingSection>

            </div>

            {/* Platform Fee Card */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-1">
                Platform Fee
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Percentage commission charged by CarryGo
              </p>

              <div className="max-w-xs">
                <label className="block text-sm font-medium mb-1">
                  Platform Fee (%)
                </label>
                <Field
                  name="platformFeePercent"
                  type="number"
                  disabled={!editMode}
                />

                <ErrorMessage
                  name="platformFeePercent"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="sticky bottom-0 bg-white border-t py-3 flex justify-between items-center">

              {!editMode ? (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="text-sm border rounded-lg px-4 py-1.5"
                >
                  Edit Pricing Policy
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setEditMode(false);
                  }}
                  className="text-sm border rounded-lg px-4 py-1.5"
                >
                  Cancel
                </button>
              )}

              {editMode && (
                <button
                  type="submit"
                  disabled={!dirty || !isValid || submitLoading}
                  className="text-sm bg-primary text-white rounded-lg px-5 py-1.5 disabled:opacity-50"
                >
                  {submitLoading ? "Publishing..." : "Publish New Policy Version"}
                </button>
              )}
            </div>


          </Form>
        )}
      </Formik>
    </div>

  );
}

/* ---------------- Reusable Components ---------------- */

const PricingSection = ({
  title,
  description,
  unit,
  children,
}: {
  title: string;
  description: string;
  unit: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {description} <span className="font-medium">({unit})</span>
      </p>
    </div>
    {children}
  </div>
);

const RangeField = ({
  minName,
  maxName,
  disabled,
}: {
  minName: string;
  maxName: string;
  disabled: boolean;
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-sm text-gray-600">Minimum</label>
      <Field name={minName} type="number" disabled={disabled} />
      <ErrorMessage
        name={minName}
        component="p"
        className="text-red-500 text-xs mt-1"
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">Maximum</label>
      <Field name={maxName} type="number" disabled={disabled} />
      <ErrorMessage
        name={maxName}
        component="p"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  </div>
);

