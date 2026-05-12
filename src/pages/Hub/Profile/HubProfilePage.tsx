import { useEffect, useState } from "react";
import { useHubProfile } from "../../../Services/Hub/HubProfile";
import type { GetHubProfileDTO, HubResetPasswordRequestDTO } from "../../../shared/constants_Types/types/Hub/HubProfile";
import { DashboardProvider } from "../../../context/DashboardProvider";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import LoadingScreen from "../../../shared/components/loading/CarryGoLoadingScreen";
import UserEditProfileModal from "../../User/components/ProfileComponents/UserEditProfileModal";
import UserResetPasswordModal from "../../User/components/ProfileComponents/UserResetPasswordModal";
import ProfileSection from "../../User/components/ProfileComponents/ProfileSection";
import ProfileField from "../../User/components/ProfileComponents/ProfileField";
import KycBadge from "../../../shared/components/globelcomponents/KycBadge";


const capitalize = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "-";

const HubProfilePage = () => {
    const { getHubProfile, updateHubProfile, resetHubPassword, } = useHubProfile();

    const [hub, setHub] = useState<GetHubProfileDTO | null>(null);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const fetchProfile = async () => {
        const data = await getHubProfile();
        if (data) setHub(data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditProfile = async (data: { name: string; mobile: string }) => {
        await updateHubProfile(data);
        await fetchProfile();
        setEditProfileOpen(false);
    };

    const handleResetPassword = async (
        data: HubResetPasswordRequestDTO
    ) => {
        await resetHubPassword(data);
        setResetPasswordOpen(false);
    };

    if (!hub) {
        return (
            <DashboardProvider role="hub">
                <DashboardLayout pageTitle="Hub Profile">
                    <LoadingScreen />
                </DashboardLayout>
            </DashboardProvider>
        );
    }

    const isKycApproved = hub.kycStatus === "APPROVED";

    return (
        <DashboardProvider role="hub">
            <DashboardLayout pageTitle="Hub Profile">
                <>
                    {/* Modals */}
                    <UserEditProfileModal
                        open={editProfileOpen}
                        onClose={() => setEditProfileOpen(false)}
                        user={{ name: hub.name, mobile: hub.mobile }}
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
                                    Hub Account
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Hub profile details & verification status
                                </p>
                            </div>

                            <div className="space-y-10">

                                {/* Personal Info */}
                                <ProfileSection
                                    title="Hub Information"
                                    description="Basic Hub identity details"
                                >
                                    <ProfileField label="Hub Name" value={hub.name} />
                                    <ProfileField label="Email Address" value={hub.email} />
                                    <ProfileField label="Mobile Number" value={hub.mobile} />

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
                                    description="Hub role & verification info"
                                >
                                    <ProfileField
                                        label="Role"
                                        value={capitalize(hub.role)}
                                    />

                                    <ProfileField
                                        label="KYC Status"
                                        value={<KycBadge status={hub.kycStatus} />}
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
                                            ? "✅ Hub is eligible to operate"
                                            : "⏳ Complete KYC to activate Hub services"}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {isKycApproved
                                            ? "You can manage Hubs, workers, and deliveries."
                                            : "Once KYC is approved, Hub features will be unlocked."}
                                    </p>
                                </div>

                            </div>

                            <p className="mt-10 text-xs text-gray-400">
                                Hub account created on{" "}
                                {new Date(hub.createdAt).toLocaleDateString()}
                            </p>
                        </section>
                    </main>
                </>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default HubProfilePage;
