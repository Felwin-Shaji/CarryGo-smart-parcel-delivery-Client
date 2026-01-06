import { Formik, Form, Field, useFormikContext, getIn } from "formik";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { agencyPricingSchema } from "../../validation/agencyPricingSchema";
import { useAgencyPricing } from "../../Services/Agency/AgencyPricing";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import type { AgencyPricingResponseDTO } from "../../constants_Types/types/Agency/AgencyPricing.dto";


// export type AgencyPricingFormValues = AgencyPricingResponseDTO;

export interface AgencyPricingFormValues {
  serviceType: "STANDARD" | "EXPRESS";
  basePrice: number;
  pricePerKm: number;
  sizePricing: {
    SMALL: { price: number };
    MEDIUM: { price: number };
    LARGE: { price: number };
  };
}

export default function AgencyPricingPage() {

  const { getAgencyPricing, updateAgencyPricing } = useAgencyPricing();

  const [pricingResponse, setPricingResponse] =
    useState<AgencyPricingResponseDTO | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);


  async function HandleFetchAgencyPricing() {
    try {
      setLoading(true);
      const res = await getAgencyPricing();
      setPricingResponse(res);
    } finally {
      setLoading(false);
    }
  };

  const formInitialValues: AgencyPricingFormValues | null =
    pricingResponse
      ? {
        serviceType: pricingResponse.agencyPricing.serviceType,
        basePrice: pricingResponse.agencyPricing.basePrice,
        pricePerKm: pricingResponse.agencyPricing.pricePerKm,
        sizePricing: pricingResponse.agencyPricing.sizePricing,
      }
      : null;

  useEffect(() => {
    HandleFetchAgencyPricing()
  }, [])

  if (loading && !pricingResponse) {
    return (
      <DashboardProvider role="agency">
        <DashboardLayout pageTitle="Agency Pricing">
          <LoadingScreen />
        </DashboardLayout>
      </DashboardProvider>
    )
  }

  return (
    <DashboardProvider role="agency">
      <DashboardLayout pageTitle="Agency Pricing">
        <div className="container max-w-6xl space-y-6">

          {/* HEADER */}
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
              Configure how parcels are priced for your agency.
              Prices are applied automatically during booking.
            </p>

            <span className="text-xs px-3 py-1 rounded-full bg-gray-100">
              STANDARD SERVICE
            </span>
          </div>

          {pricingResponse?.isOutdated && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              ⚠️ <strong>Pricing policy updated by admin.</strong><br />
              Your current pricing does not follow the latest rules.
              Please review and save updated pricing to continue accepting bookings.
            </div>
          )}


          {formInitialValues && pricingResponse && (
            <Formik<AgencyPricingFormValues>
              initialValues={formInitialValues}
              validationSchema={agencyPricingSchema(pricingResponse.policy)}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitLoading(true);
                  const updated = await updateAgencyPricing(values);

                  setPricingResponse(updated);
                  setEditMode(false);
                } finally {
                  setSubmitLoading(false);
                  setSubmitting(false);
                }
              }}

            >



              {({ values, initialValues }) => {
                const hasChanges =
                  JSON.stringify(values) !== JSON.stringify(initialValues);

                return (
                  <Form className="space-y-6">

                    {/* SUMMARY */}
                    <div className={`border rounded-xl px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm
  ${editMode ? "bg-blue-50/40" : "bg-white"}`}>

                      <div>
                        <p className="text-xs text-gray-500">Service Type</p>
                        <p className="font-semibold">{values.serviceType}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Base Price</p>
                        {editMode ? (
                          <>
                            <Field
                              name="basePrice"
                              type="number"
                              min={pricingResponse.policy.minBasePrice}
                              max={pricingResponse.policy.maxBasePrice}
                            />
                            <FieldError name="basePrice" />
                          </>
                        ) : (
                          <p className="font-semibold">₹ {values.basePrice}</p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Distance Charge</p>
                        {editMode ? (
                          <>
                            <Field
                              name="pricePerKm"
                              type="number"
                              min={pricingResponse.policy.minPricePerKm}
                              max={pricingResponse.policy.maxPricePerKm}
                            />
                            <FieldError name="pricePerKm" />
                          </>
                        ) : (
                          <p className="font-semibold">₹ {values.pricePerKm} / km</p>
                        )}
                      </div>
                    </div>


                    {/* SIZE PRICING */}
                    <div className="bg-white border rounded-xl overflow-hidden">
                      <div className="px-4 py-3 border-b">
                        <h3 className="text-sm font-semibold">Parcel Size Pricing</h3>
                        <p className="text-xs text-gray-500">
                          Flat price applied based on parcel size category
                        </p>
                      </div>

                      <div className="divide-y">
                        {(["SMALL", "MEDIUM", "LARGE"] as const).map((size) => (
                          <div
                            key={size}
                            className="grid grid-cols-3 items-center px-4 py-3 text-sm"
                          >
                            {/* SIZE LABEL */}
                            <div className="font-medium">
                              {size}
                              <span className="ml-2 text-xs text-gray-400">
                                {size === "SMALL" && "Documents / Small items"}
                                {size === "MEDIUM" && "Shoes / Small boxes"}
                                {size === "LARGE" && "Large boxes"}
                              </span>
                            </div>


                            {/* PRICE */}
                            <div>
                              {editMode ? (
                                <>
                                  <Field
                                    name={`sizePricing.${size}.price`}
                                    type="number"
                                    disabled={!editMode}
                                    className="w-28"
                                  />
                                  <FieldError name={`sizePricing.${size}.price`} />
                                </>

                              ) : (
                                <span className="font-semibold">
                                  ₹ {values.sizePricing[size].price}
                                </span>
                              )}
                            </div>

                            {/* INFO */}
                            <div className="text-xs text-gray-500 text-right">
                              Flat price
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>


                    {/* CHANGE INDICATOR */}
                    {editMode && hasChanges && (
                      <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                        You have unsaved pricing changes
                      </div>
                    )}

                    {/* ACTION BAR */}
                    <div className="sticky bottom-0 bg-white border-t py-3 flex justify-between items-center">

                      <PricingActionBar
                        editMode={editMode}
                        setEditMode={setEditMode}
                        submitLoading={submitLoading}
                      />
                    </div>

                  </Form>
                );
              }}
            </Formik>)}
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
};

function PricingActionBar({
  editMode,
  setEditMode,
  submitLoading
}: {
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  submitLoading:boolean
}) {
  const { dirty, resetForm } =
    useFormikContext<AgencyPricingFormValues>();

  return (
    <div className="flex justify-between items-center w-full">
      {!editMode ? (
        <button
          type="button"
          onClick={() => setEditMode(true)}
          className="text-sm border rounded-lg px-4 py-1.5"
        >
          Edit Pricing
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
          disabled={!dirty}
          className="text-sm bg-primary text-white rounded-lg px-5 py-1.5 disabled:opacity-50"
        >
          {submitLoading ?"Saving..." :"Save Changes"}
          
        </button>
      )}
    </div>
  );
};

// import { useFormikContext, getIn } from "formik";

function FieldError({ name }: { name: string }) {
  const { errors, touched } = useFormikContext<any>();

  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  if (!error || !isTouched) return null;

  return (
    <p className="mt-1 text-xs text-red-600">
      {error}
    </p>
  );
}


