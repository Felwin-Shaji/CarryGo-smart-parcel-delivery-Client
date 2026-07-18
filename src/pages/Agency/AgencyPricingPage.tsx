import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { useAgencyPricing } from "../../Services/Agency/AgencyPricing";
import { agencyPricingSchema } from "../../validation/agencyPricingSchema";
import type { AgencyPricingResponseDTO } from "../../shared/constants_Types/types/Agency/AgencyPricing.dto";
import { confirmToast } from "../../shared/components/globelcomponents/confirmToast";

interface AgencyPricingFormValues {
  serviceType: "STANDARD" | "EXPRESS";
  basePrice: number;
  pricePerKm: number;
  pricePerKg: number;
}

export default function AgencyPricingPage() {

  const { getAgencyPricing, updateAgencyPricing } = useAgencyPricing();

  const [pricingResponse, setPricingResponse] =
    useState<AgencyPricingResponseDTO | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  async function fetchPricing() {
    try {
      setLoading(true);
      const res = await getAgencyPricing();
      setPricingResponse(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPricing();
  }, []);

  if (loading || !pricingResponse) {
    return (
      <DashboardProvider role="agency">
        <DashboardLayout pageTitle="Agency Pricing">
          <AgencyPricingSkeleton />
        </DashboardLayout>
      </DashboardProvider>
    );
  }

  const initialValues: AgencyPricingFormValues = {
    serviceType: pricingResponse.agencyPricing.serviceType,
    basePrice: pricingResponse.agencyPricing.basePrice,
    pricePerKm: pricingResponse.agencyPricing.pricePerKm,
    pricePerKg: pricingResponse.agencyPricing.pricePerKg,
  };

  return (
    <DashboardProvider role="agency">
      <DashboardLayout pageTitle="Agency Pricing">

        <div className="my-3  max-w-6xl mx-auto space-y-6">

          {pricingResponse.isOutdated && (
            <div className="border border-amber-300 bg-amber-50 rounded-lg p-4 text-sm text-amber-800">
              ⚠ Pricing policy updated by admin.
              Please review and save to continue accepting bookings.
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={agencyPricingSchema(pricingResponse.policy)}
            onSubmit={async (values) => {
              try {
                setSubmitLoading(true);
                const updated = await updateAgencyPricing(values);
                setPricingResponse(updated);
              } finally {
                setSubmitLoading(false);
              }

            }}
          >

            {({ values }) => (

              <Form className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT PANEL — SUMMARY */}

                <div className="bg-white border rounded-xl p-6 space-y-5">

                  <h3 className="font-semibold text-gray-800">
                    Pricing Summary
                  </h3>

                  <div className="space-y-4">

                    <SummaryRow
                      label="Service Type"
                      value={values.serviceType}
                    />

                    <SummaryRow
                      label="Base Price"
                      value={`₹ ${values.basePrice}`}
                    />

                    <SummaryRow
                      label="Distance Charge"
                      value={`₹ ${values.pricePerKm} / km`}
                    />

                    <SummaryRow
                      label="Weight Charge"
                      value={`₹ ${values.pricePerKg} / kg`}
                    />

                  </div>

                </div>

                {/* RIGHT PANEL — CONFIGURATION */}

                <div className="lg:col-span-2 bg-white border rounded-xl p-6 space-y-6">

                  <h3 className="font-semibold text-gray-800">
                    Pricing Configuration
                  </h3>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Configure pricing rules used when customers book deliveries.
                    </p>
                  </div>

                  {/* BASE PRICE */}

                  <PricingField
                    label="Base Price"
                    description="Minimum cost for every delivery"
                    name="basePrice"
                    suffix="₹"
                  />

                  {/* DISTANCE */}

                  <PricingField
                    label="Distance Charge"
                    description="Cost per kilometer travelled"
                    name="pricePerKm"
                    suffix="₹ / km"
                  />

                  {/* WEIGHT */}

                  <PricingField
                    label="Weight Charge"
                    description="Charge applied per KG of parcel"
                    name="pricePerKg"
                    suffix="₹ / kg"
                  />

                  {/* POLICY LIMITS */}

                  <div className="bg-gray-50 border rounded-lg p-4 text-xs text-gray-600">

                    <p className="font-medium mb-2">
                      Allowed Policy Limits
                    </p>

                    <ul className="space-y-1">

                      <li>
                        Base Price: ₹{pricingResponse.policy.minBasePrice}
                        – ₹{pricingResponse.policy.maxBasePrice}
                      </li>

                      <li>
                        Price / KM: ₹{pricingResponse.policy.minPricePerKm}
                        – ₹{pricingResponse.policy.maxPricePerKm}
                      </li>

                      <li>
                        Price / KG: ₹{pricingResponse.policy.minPricePerKg}
                        – ₹{pricingResponse.policy.maxPricePerKg}
                      </li>

                    </ul>

                  </div>

                  {/* SAVE */}

                  <div className="pt-4 border-t">

                    <ConfirmSaveButton submitLoading={submitLoading} />

                  </div>

                </div>

              </Form>

            )}

          </Formik>

        </div>

      </DashboardLayout>
    </DashboardProvider>
  );
}

function PricingField({
  label,
  description,
  name,
  suffix
}: {
  label: string;
  description: string;
  name: string;
  suffix: string;
}) {
  return (

    <div className="flex items-center justify-between border rounded-lg p-4">

      <div>

        <p className="text-sm font-medium">
          {label}
        </p>

        <p className="text-xs text-gray-500">
          {description}
        </p>

      </div>

      <div className="flex items-center gap-2">

        <Field
          name={name}
          type="number"
          className="border rounded-md px-3 py-1.5 w-32 text-sm"
        />

        <ErrorMessage
          name={name}
          component="p"
          className="text-red-500 text-xs"
        />

        <span className="text-xs text-gray-500">
          {suffix}
        </span>

      </div>

    </div>

  );
}

function SummaryRow({
  label,
  value
}: {
  label: string;
  value: string;
}) {

  return (
    <div className="flex justify-between text-sm">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

function ConfirmSaveButton({ submitLoading }: { submitLoading: boolean }) {

  const { submitForm, dirty } = useFormikContext();

  return (
    <button
      type="button"
      disabled={!dirty || submitLoading}
      onClick={() => {
        confirmToast(
          "Are you sure you want to save these pricing changes?",
          () => submitForm()
        );
      }}
      className="bg-primary text-white px-6 py-2 rounded-lg text-sm disabled:opacity-50"
    >
      {submitLoading ? "Saving..." : "Save Changes"}
    </button>
  );
}

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

function AgencyPricingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <Skeleton className="h-8 w-56 mb-3" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Warning Banner */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <Skeleton className="h-4 w-72 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Summary */}
        <div className="bg-white border rounded-xl p-6 space-y-5">

          <Skeleton className="h-6 w-36" />

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Right Form */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-6 space-y-6">

          <Skeleton className="h-6 w-56" />

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-52" />
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}

          {/* Policy Limits */}
          <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-3 w-64" />
            <Skeleton className="h-3 w-60" />
            <Skeleton className="h-3 w-56" />
          </div>

          {/* Save Button */}
          <div className="border-t pt-4 flex justify-end">
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>

        </div>

      </div>

    </div>
  );
}