import { useEffect, useState } from "react";
import type { GetWorkerProfileDTO, WorkerResetPasswordRequestDTO } from "../../shared/constants_Types/types/Worker/WorkerProfile.dto";
import { useWorkerProfile } from "../../Services/Worker/WorkerProfile";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import UserEditProfileModal from "../User/components/ProfileComponents/UserEditProfileModal";
import UserResetPasswordModal from "../User/components/ProfileComponents/UserResetPasswordModal";
import ProfileSection from "../User/components/ProfileComponents/ProfileSection";
import ProfileField from "../User/components/ProfileComponents/ProfileField";
import KycBadge from "../../shared/components/globelcomponents/KycBadge";


const capitalize = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "-";

const WorkerProfilePage = () => {
    const { getWorkerProfile, updateWorkerProfile, resetWorkerPassword, } = useWorkerProfile();

    const [worker, setWorker] = useState<GetWorkerProfileDTO | null>(null); 
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

    const fetchProfile = async () => {
        const data = await getWorkerProfile();
        if (data) setWorker(data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleEditProfile = async (data: { name: string; mobile: string }) => {
        await updateWorkerProfile(data);
        await fetchProfile();
        setEditProfileOpen(false);
    };

    const handleResetPassword = async (
        data: WorkerResetPasswordRequestDTO
    ) => {
        await resetWorkerPassword(data);
        setResetPasswordOpen(false);
    };

    if (!worker) {
        return (
            <DashboardProvider role="worker">
                <DashboardLayout pageTitle="Worker Profile">
                    <ProfileSkeleton />
                </DashboardLayout>
            </DashboardProvider>
        );
    }

    const isKycApproved = worker.kycStatus === "APPROVED";

    return (
        <DashboardProvider role="worker">
            <DashboardLayout pageTitle="Worker Profile">
                <>
                    {/* Modals */}
                    <UserEditProfileModal
                        open={editProfileOpen}
                        onClose={() => setEditProfileOpen(false)}
                        user={{ name: worker.name, mobile: worker.mobile }}
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
                                    Worker Account
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Worker profile details & verification status
                                </p>
                            </div>

                            <div className="space-y-10">

                                {/* Personal Info */}
                                <ProfileSection
                                    title="Worker Information"
                                    description="Basic worker identity details"
                                >
                                    <ProfileField label="Worker Name" value={worker.name} />
                                    <ProfileField label="Email Address" value={worker.email} />
                                    <ProfileField label="Mobile Number" value={worker.mobile} />

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
                                    description="Worker role & verification info"
                                >
                                    <ProfileField
                                        label="Role"
                                        value={capitalize(worker.role)}
                                    />

                                    <ProfileField
                                        label="KYC Status"
                                        value={<KycBadge status={worker.kycStatus} />}
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
                                            ? "✅ Worker is eligible to operate"
                                            : "⏳ Complete KYC to activate worker services"}
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        {isKycApproved
                                            ? "You can manage hubs, workers, and deliveries."
                                            : "Once KYC is approved, worker features will be unlocked."}
                                    </p>
                                </div>

                            </div>

                            <p className="mt-10 text-xs text-gray-400">
                                Worker account created on{" "}
                                {new Date(worker.createdAt).toLocaleDateString()}
                            </p>
                        </section>
                    </main>
                </>
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default WorkerProfilePage;

const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const ProfileSkeleton = () => {
    return (
        <main className="max-w-4xl mx-auto">
            <section className="bg-white rounded-3xl shadow-md p-6 sm:p-8">

                {/* Header */}
                <div className="mb-10">
                    <Skeleton className="h-8 w-52 mb-3" />
                    <Skeleton className="h-4 w-72" />
                </div>

                <div className="space-y-10">

                    {/* Admin Information */}
                    <div>
                        <Skeleton className="h-6 w-44 mb-2" />
                        <Skeleton className="h-4 w-64 mb-8" />

                        <div className="space-y-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item}>
                                    <Skeleton className="h-4 w-28 mb-2" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-6">
                            <Skeleton className="h-10 w-28 rounded-lg" />
                            <Skeleton className="h-10 w-36 rounded-lg" />
                        </div>
                    </div>

                    {/* System Details */}
                    <div>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-60 mb-8" />

                        <div>
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                </div>

                <Skeleton className="h-4 w-64 mt-10" />
            </section>
        </main>
    );
};


