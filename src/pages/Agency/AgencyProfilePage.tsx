import { useEffect, useState } from "react";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import ProfileSection from "../User/components/ProfileComponents/ProfileSection";
import ProfileField from "../User/components/ProfileComponents/ProfileField";
import UserEditProfileModal from "../User/components/ProfileComponents/UserEditProfileModal";
import UserResetPasswordModal from "../User/components/ProfileComponents/UserResetPasswordModal";
import LoadingScreen from "../../shared/components/loading/CarryGoLoadingScreen";
import KycBadge from "../../shared/components/globelcomponents/KycBadge";
import { useAgencyProfile } from "../../Services/Agency/AgencyProfile";
import type { AgencyResetPasswordRequestDTO, GetAgencyProfileDTO } from "../../shared/constants_Types/types/Agency/AgencyProfile.dto";

const capitalize = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "-";

const AgencyProfilePage = () => {
    const { getAgencyProfile, updateAgencyProfile, resetAgencyPassword, } = useAgencyProfile();

    const [agency, setAgency] = useState<GetAgencyProfileDTO | null>(null);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const fetchProfile = async () => {
        const data = await getAgencyProfile();
        if (data) setAgency(data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditProfile = async (data: { name: string; mobile: string }) => {
        await updateAgencyProfile(data);
        await fetchProfile();
        setEditProfileOpen(false);
    };

    const handleResetPassword = async (
        data: AgencyResetPasswordRequestDTO
    ) => {
        await resetAgencyPassword(data);
        setResetPasswordOpen(false);
    };

    if (!agency) {
        return (
            <DashboardProvider role="agency">
                <DashboardLayout pageTitle="Agency Profile">
                    <LoadingScreen />
                </DashboardLayout>
            </DashboardProvider>
        );
    }

    const isKycApproved = agency.kycStatus === "APPROVED";

    return (
        <DashboardProvider role="agency">
            <DashboardLayout pageTitle="Agency Profile">
                <>
                    {/* Modals */}
                    <UserEditProfileModal
                        open={editProfileOpen}
                        onClose={() => setEditProfileOpen(false)}
                        user={{ name: agency.name, mobile: agency.mobile }}
                        onSave={handleEditProfile}
                    />

                    <UserResetPasswordModal
                        open={resetPasswordOpen}
                        onClose={() => setResetPasswordOpen(false)}
                        onSave={handleResetPassword}
                    />

                    <main className="max-w-4xl mx-auto">
                        <section className="bg-white rounded-3xl shadow-md p-6 sm:p-8">

                            {/* Header */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                                    Agency Account
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Agency profile details & verification status
                                </p>
                            </div>

                            <div className="space-y-10">

                                {/* Personal Info */}
                                <ProfileSection
                                    title="Agency Information"
                                    description="Basic agency identity details"
                                >
                                    <ProfileField label="Agency Name" value={agency.name} />
                                    <ProfileField label="Email Address" value={agency.email} />
                                    <ProfileField label="Mobile Number" value={agency.mobile} />

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setEditProfileOpen(true)}
                                            className="px-3 py-1.5 text-xs"
                                        >
                                            Edit Profile
                                        </button>

                                        <button
                                            onClick={() => setResetPasswordOpen(true)}
                                            className="px-3 py-1.5 text-xs"
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </ProfileSection>

                                {/* Account Info */}
                                <ProfileSection
                                    title="Account Details"
                                    description="Agency role & verification info"
                                >
                                    <ProfileField
                                        label="Role"
                                        value={capitalize(agency.role)}
                                    />

                                    <ProfileField
                                        label="KYC Status"
                                        value={<KycBadge status={agency.kycStatus} />}
                                        hint="Required to start accepting deliveries"
                                    />
                                </ProfileSection>

                                {/* Eligibility Box */}
                                <div
                                    className={`rounded-2xl p-6 border ${isKycApproved
                                            ? "bg-green-50 border-green-200"
                                            : "bg-yellow-50 border-yellow-200"
                                        }`}
                                >
                                    <p className="font-semibold text-sm">
                                        {isKycApproved
                                            ? "✅ Agency is eligible to operate"
                                            : "⏳ Complete KYC to activate agency services"}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {isKycApproved
                                            ? "You can manage hubs, workers, and deliveries."
                                            : "Once KYC is approved, agency features will be unlocked."}
                                    </p>
                                </div>

                            </div>

                            <p className="mt-10 text-xs text-gray-400">
                                Agency account created on{" "}
                                {new Date(agency.createdAt).toLocaleDateString()}
                            </p>
                        </section>
                    </main>
                </>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AgencyProfilePage;
