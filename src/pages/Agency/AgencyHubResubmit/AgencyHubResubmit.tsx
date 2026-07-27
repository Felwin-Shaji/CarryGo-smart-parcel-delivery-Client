import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useAgency } from "../../../Services/Agency/Agency";
import { useAgencyAddHub } from "../../../Services/Agency/AgencyAddHub";
import type { RootState } from "../../../store/store";
import { ROLES, type Roles } from "../../../shared/constants_Types/types/roles";

import ResubmitBanner from "./components/ResubmitBanner";
import ResubmitAddressForm from "./components/ResubmitAddressForm";
import ResubmitUploadForm from "./components/ResubmitUploadForm";
import { ResubmitSkeleton } from "./components/ResubmitSkeleton"; // Import skeleton here

import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { SecondaryHeader } from "../../../layouts/SecondaryHeader";
import Breadcrumbs from "../../../shared/components/globelcomponents/Breadcrumbs";

export interface HubResubmitPayload {
    agencyId: string;
    hubId: string;
    name: string;
    email: string;
    mobile: string;
    role: Roles;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
    location_lat: number;
    location_lng: number;
    verificationImage: File | string | null;
}

type ResubmitTab = "address" | "verification";

export default function AgencyHubResubmit() {
    const { id: hubId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { getHubDetailsById } = useAgency();
    const { reSubmitHub } = useAgencyAddHub();
    const agencyId = useSelector((state: RootState) => state.agencyState.agency?.id);

    const [step, setStep] = useState<3 | 4>(3);
    const [pageLoading, setPageLoading] = useState(true);
    const [isSubmittingForm, setIsSubmittingForm] = useState(false);
    const [rejectionReason, setRejectionReason] = useState<string>("");

    const [formData, setFormData] = useState<HubResubmitPayload>({
        agencyId: agencyId || "",
        hubId: hubId || "",
        name: "",
        email: "",
        mobile: "",
        role: "hub",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",
        location_lat: 0,
        location_lng: 0,
        verificationImage: null,
    });

    useEffect(() => {
        if (!hubId) return;

        const loadRejectedHub = async () => {
            try {
                setPageLoading(true);
                const response = await getHubDetailsById(hubId);

                if (!response || !response.hub) {
                    // toast.error("Hub context not found");
                    navigate("/agency/hubs");
                    return;
                }

                const activeHub = response.hub;

                if (activeHub.kycStatus !== "REJECTED") {
                    toast.error("This hub profile does not require resubmission.");
                    navigate(`/agency/hubs`);
                    return;
                }

                setRejectionReason(
                    (activeHub as any).rejectionReason ||
                    "Verification image documents were blurry or address coordinates did not match."
                );

                setFormData({
                    agencyId: agencyId || activeHub.agencyId || "",
                    hubId: hubId,
                    name: activeHub.name || "",
                    email: activeHub.email || "",
                    mobile: activeHub.mobile || "",
                    role: "hub",
                    addressLine1: activeHub.address?.addressLine1 || "",
                    city: activeHub.address?.city || "",
                    state: activeHub.address?.state || "",
                    pincode: activeHub.address?.pincode || "",
                    location_lat: activeHub.location?.lat || 0,
                    location_lng: activeHub.location?.lng || 0,
                    verificationImage: activeHub.verificationImage || null,
                });

            } catch (error) {
                toast.error("Failed to sync structural hub details");
                console.error(error);
            } finally {
                setPageLoading(false);
            }
        };

        loadRejectedHub();
    }, [hubId, agencyId]);

    const handleAddressSubmit = (values: Partial<HubResubmitPayload>) => {
        setFormData(prev => ({ ...prev, ...values }));
        setStep(4);
    };

    const handleFinalFormSubmit = async () => {
        if (!hubId) {
            toast.error("Hub ID tracking context missing.");
            return;
        }

        setIsSubmittingForm(true);
        try {
            const success = await reSubmitHub(formData, hubId);
            if (success) {
                navigate("/agency/hubs");
            }
        } catch (error) {
            toast.error("An error occurred during verification submission.");
        } finally {
            setIsSubmittingForm(false);
        }
    };

    const currentTab: ResubmitTab = step === 3 ? "address" : "verification";

    const handleTabChange = (tabKey: string) => {
        if (pageLoading) return; // Prevent tab toggles when layout is hydrating
        if (tabKey === "address") {
            setStep(3);
        } else if (tabKey === "verification") {
            if (!formData.addressLine1 || !formData.city || !formData.pincode) {
                toast.error("Please fill address information first.");
                return;
            }
            setStep(4);
        }
    };

    return (
        <DashboardProvider role={ROLES.AGENCY}>
            <DashboardLayout>
                {/* Secondary header remains persistent and interactive */}
                <SecondaryHeader
                    title={pageLoading ? "Resubmit KYC: Loading..." : `Resubmit KYC: ${formData.name}`}
                    showBack
                    onBack={() => navigate(-1)}
                    tabs={[
                        { key: "address", label: "1. Hub Address" },
                        { key: "verification", label: "2. Verification Docs" },
                    ]}
                    activeTab={currentTab}
                    onTabChange={handleTabChange}
                />
                <Breadcrumbs
                    items={[
                        { label: "Hubs", to: "/agency/hubs" },
                        {
                            label: pageLoading ? "Loading Hub..." : formData.name,
                            to: pageLoading ? undefined : `/agency/hub/${hubId}`
                        },
                        { label: "Resubmit KYC" },
                    ]}
                />

                {/* Localized Flow Switching Wrapper */}
                <div className="max-w-4xl mx-auto p-6 space-y-8">
                    {pageLoading ? (
                        <ResubmitSkeleton />
                    ) : (
                        <>
                            <ResubmitBanner step={step} rejectionReason={rejectionReason} />

                            {step === 3 && (
                                <ResubmitAddressForm
                                    formData={formData}
                                    onSubmit={handleAddressSubmit}
                                    onCancel={() => navigate(-1)}
                                />
                            )}

                            {step === 4 && (
                                <ResubmitUploadForm
                                    isSubmitting={isSubmittingForm}
                                    imageValue={formData.verificationImage}
                                    onImageChange={(file) => setFormData(prev => ({ ...prev, verificationImage: file }))}
                                    onBack={() => setStep(3)}
                                    onCancel={() => navigate(-1)}
                                    onFinish={handleFinalFormSubmit}
                                />
                            )}
                        </>
                    )}
                </div>
            </DashboardLayout>
        </DashboardProvider>
    );
}