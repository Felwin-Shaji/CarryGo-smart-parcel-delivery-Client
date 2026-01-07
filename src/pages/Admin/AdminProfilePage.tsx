import { useEffect, useState } from "react";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import ProfileSection from "../User/components/ProfileComponents/ProfileSection";
import ProfileField from "../User/components/ProfileComponents/ProfileField";
import UserEditProfileModal from "../User/components/ProfileComponents/UserEditProfileModal";
import UserResetPasswordModal from "../User/components/ProfileComponents/UserResetPasswordModal";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useAdminProfile } from "../../Services/Admin/AdminProfile";
import type { AdminResetPasswordRequestDTO, GetAdminProfileDTO } from "../../constants_Types/types/Admin/AdminProfile.dto";


const capitalize = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "-";

const AdminProfilePage = () => {
    const { getAdminProfile, updateAdminProfile, resetAdminPassword } =
        useAdminProfile();

    const [admin, setAdmin] = useState<GetAdminProfileDTO | null>(null);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const fetchProfile = async () => {
        const data = await getAdminProfile();
        if (data) setAdmin(data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditProfile = async (data: { name: string; mobile: string }) => {
        await updateAdminProfile(data);
        await fetchProfile();
        setEditProfileOpen(false);
    };

    const handleResetPassword = async (
        data: AdminResetPasswordRequestDTO
    ) => {
        await resetAdminPassword(data);
        setResetPasswordOpen(false);
    };

    if (!admin) return <LoadingScreen />;

    return (
        <DashboardProvider role="admin">
            <DashboardLayout pageTitle="Admin Profile">
                <>
                    {/* Modals */}
                    <UserEditProfileModal
                        open={editProfileOpen}
                        onClose={() => setEditProfileOpen(false)}
                        user={{ name: admin.name, mobile: admin.mobile }}
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
                                    Admin Account
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Administrative account details & access info
                                </p>
                            </div>

                            <div className="space-y-10">

                                {/* Personal Info */}
                                <ProfileSection
                                    title="Admin Information"
                                    description="Basic admin identity details"
                                >
                                    <ProfileField label="Full Name" value={admin.name} />
                                    <ProfileField label="Email Address" value={admin.email} />
                                    <ProfileField label="Mobile Number" value={admin.mobile} />

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

                                {/* System Info */}
                                <ProfileSection
                                    title="System Details"
                                    description="Role & platform access information"
                                >
                                    <ProfileField
                                        label="Role"
                                        value={capitalize(admin.role)}
                                    />

                                    {/* <ProfileField
                                        label="Access Level"
                                        value={capitalize(admin.accessLevel)}
                                        hint="Determines admin privileges"
                                    />

                                    <ProfileField
                                        label="Last Login"
                                        value={
                                            admin.lastLogin
                                                ? new Date(admin.lastLogin).toLocaleString()
                                                : "-"
                                        }
                                    /> */}
                                </ProfileSection>

                            </div>

                            <p className="mt-10 text-xs text-gray-400">
                                Admin account created on{" "}
                                {new Date(admin.createdAt).toLocaleDateString()}
                            </p>
                        </section>
                    </main>
                </>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AdminProfilePage;
