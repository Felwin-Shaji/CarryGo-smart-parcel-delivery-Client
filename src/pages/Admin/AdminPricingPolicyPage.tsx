import { Formik, Form, Field, ErrorMessage } from "formik";
import { pricingPolicySchema } from "../../validation/pricingPolicySchema";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { useEffect, useState } from "react";
import type { PricingPolicyResponseDTO } from "../../constants_Types/types/Admin/PricingPolicy.dto";
import { useAdminPricingPolicy } from "../../Services/Admin/AdminPricingPolicy";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";

export default function AdminPricingPolicy() {

  const { getAdminPricing } = useAdminPricingPolicy();

  const [initialValues, setInitialValues] =
    useState<PricingPolicyResponseDTO | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await getAdminPricing();
        setInitialValues(data);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  if (loading) {
    return (
      <DashboardProvider role="admin">
        <DashboardLayout pageTitle="Pricing Policy">
          <LoadingScreen />
        </DashboardLayout>
      </DashboardProvider>
    );
  }

  return (
    <DashboardProvider role="admin">
      <DashboardLayout pageTitle="Pricing Policy">
        <div className="container max-w-5xl">

          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold">Pricing Policy</h1>
            <p className="text-gray-600 mt-1">
              Define guardrails for agency pricing. Agencies must stay within
              these limits.
            </p>
          </div>

          <Formik
            initialValues={initialValues!}
            enableReinitialize
            validationSchema={pricingPolicySchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Pricing policy:", values);
              setSubmitting(false);
            }}
          >

            {({ isSubmitting, isValid }) => (
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
                    />
                  </PricingSection>

                  <PricingSection
                    title="Weight Charge"
                    description="Allowed price range per kilogram (chargeable weight)"
                    unit="₹ / kg"
                  >
                    <RangeField
                      minName="minPricePerKg"
                      maxName="maxPricePerKg"
                    />
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
                    />
                    <ErrorMessage
                      name="platformFeePercent"
                      component="p"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`px-6 py-2 rounded-xl ${!isValid || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                      }`}
                  >
                    Save Pricing Policy
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </DashboardLayout>
    </DashboardProvider>
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
}: {
  minName: string;
  maxName: string;
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-sm text-gray-600">Minimum</label>
      <Field name={minName} type="number" />
      <ErrorMessage
        name={minName}
        component="p"
        className="text-red-500 text-xs mt-1"
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">Maximum</label>
      <Field name={maxName} type="number" />
      <ErrorMessage
        name={maxName}
        component="p"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  </div>
);
