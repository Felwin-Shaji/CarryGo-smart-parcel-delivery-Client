import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import KycBadge from "../../components/globelcomponents/KycBadge";
import ProfileSection from "./components/ProfileComponents/ProfileSection";
import ProfileField from "./components/ProfileComponents/ProfileField";
import UserEditProfileModal from "./components/ProfileComponents/UserEditProfileModal";
import UserResetPasswordModal from "./components/ProfileComponents/UserResetPasswordModal";
import { useUserProfile } from "../../Services/User/userProfile";
import type { GetUserProfileDTO } from "../../constants_Types/types/User/user.dto";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";

const capitalize = (value?: string) => {
    if (!value) return "-";
    return value.charAt(0).toUpperCase() + value.slice(1);
};


const UserProfile = () => {
    const { getUserProfile, updateUserProfile } = useUserProfile();

    const [user, setUser] = useState<GetUserProfileDTO | null>(null)

    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const fetchProfile = async () => {
            const profileData = await getUserProfile();
            if (profileData) setUser(profileData);
    };

    useEffect(() => {
        fetchProfile();
    }, [])

    const handleOnSaveEditProfile = async (data: { name: string; mobile: string }) => {
        await updateUserProfile(data);
        await fetchProfile();
        setEditProfileOpen(false);
    }

    if (!user) {
        return (
            <>
                <Header isLoggedIn={true} />
                <LoadingScreen />
            </>
        );
    }



    const isKycApproved = user.kycStatus === "APPROVED";

    return (
        <>
            <UserEditProfileModal
                open={editProfileOpen}
                onClose={() => setEditProfileOpen(false)}
                user={{ name: user.name, mobile: user.mobile }}
                onSave={handleOnSaveEditProfile}
            />

            <UserResetPasswordModal
                open={resetPasswordOpen}
                onClose={() => setResetPasswordOpen(false)}
                onSave={(data) => {
                    console.log("Reset password:", data);
                    setResetPasswordOpen(false);
                }}
            />


            <Header isLoggedIn={true} />

            <main className="flex justify-center mt-5 mb-5 px-4">

                <section className="w-full max-w-5xl rounded-3xl bg-white shadow-xl p-6 sm:p-8">

                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                            My Account
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Your personal details and account status at a glance
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-10">

                        {/* Personal Info */}
                        <ProfileSection
                            title="Personal Information"
                            description="Basic details used to identify your account"
                        >
                            <ProfileField label="Full Name" value={user.name} />
                            <ProfileField label="Email Address" value={user.email} />
                            <ProfileField label="Mobile Number" value={user.mobile} />

                            {/* Action Buttons */}
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
                            description="Information about how your account works"
                        >
                            <ProfileField
                                label="Account Type"
                                value={capitalize(user.role)}
                                hint="This defines what actions you can perform"
                            />

                            <ProfileField
                                label="KYC Verification"
                                value={<KycBadge status={user.kycStatus} />}
                                hint="Identity verification required for deliveries"
                            />
                        </ProfileSection>

                        {/* Eligibility Message */}
                        <div
                            className={`rounded-2xl p-6 border
                ${isKycApproved
                                    ? "bg-green-50 border-green-200"
                                    : "bg-yellow-50 border-yellow-200"
                                }`}
                        >
                            <p className="font-semibold text-sm">
                                {isKycApproved
                                    ? "✅ You are eligible to work as a Delivery Partner"
                                    : "⏳ Complete KYC to become a Delivery Partner"}
                            </p>

                            <p className="mt-1 text-sm text-gray-600">
                                {isKycApproved
                                    ? "You can now accept delivery requests and earn money."
                                    : "Once your KYC is approved, you can start accepting delivery tasks."}
                            </p>
                        </div>

                    </div>

                    {/* Footer */}
                    <p className="mt-10 text-xs text-gray-400">
                        Account created on{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                </section>
            </main>
        </>
    );
};

export default UserProfile;
