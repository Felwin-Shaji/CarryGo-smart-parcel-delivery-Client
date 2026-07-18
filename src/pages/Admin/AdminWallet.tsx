import { useEffect, useState } from "react";
import type { WalletOverview } from "../../shared/constants_Types/types/walletType";
import { WalletCard } from "../../shared/components/Wallet/WalletCard";
import { TransactionList } from "../../shared/components/Wallet/TransactionList";
import toast from "react-hot-toast";
import { openRazorpayCheckout } from "../../Services/Payment/razorpay";
import { AddMoneyModal } from "../../shared/components/Wallet/AddMoneyModal";
import { useAdminWallet } from "../../Services/Admin/AdminWallet";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { WithdrawMoneyModal } from "../../shared/components/Wallet/WithdrawMoneyModal";

const AdminWallet = () => {
    const { getWallet, createWalletOrder, withdrawMoney } = useAdminWallet();
    const [wallet, setWallet] = useState<WalletOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);



    async function handleAddMoney(amount: number) {

        setShowAddMoney(false);

        const res = await createWalletOrder(amount);

        openRazorpayCheckout({
            key: res.key,
            orderId: res.orderId,
            amount: res.amount,
            currency: res.currency,
            role: "admin",

            title: "CarryGo Wallet",
            description: "Add money to wallet",
            onSuccess: () => {
                toast.success("Money added successfully");
                getWallet().then(setWallet);
            },
            onFailure: () => {
                toast.error("Payment cancelled");
            },
        });
    }

    async function handleWithdraw(amount: number) {
        setShowWithdraw(false);

        const res = await withdrawMoney(amount);

        toast.success("Money withdrawn successfully");

        setWallet(prev => prev ? {
            ...prev,
            balance: res.balance
        } : prev);

    }

    useEffect(() => {
        getWallet()
            .then(setWallet)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <DashboardProvider role="admin">
                <DashboardLayout pageTitle="Wallet">
                    <WalletSkeleton />
                </DashboardLayout>
            </DashboardProvider>
        );
    }

    if (!wallet) return <div>No wallet data</div>;

    return (
        <>
            <DashboardProvider role="admin">
                <DashboardLayout pageTitle="Wallet">

                    {showAddMoney && (
                        <AddMoneyModal
                            onClose={() => setShowAddMoney(false)}
                            onProceed={handleAddMoney}
                        />
                    )}


                    {showWithdraw && (
                        <WithdrawMoneyModal
                            onClose={() => setShowWithdraw(false)}
                            onProceed={handleWithdraw}
                        />
                    )}

                    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                        <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">

                            <WalletCard
                                balance={wallet.balance}
                                lockedBalance={wallet.lockedBalance}
                                showAddMoney={true}
                                showWithdraw={true}
                                onAddMoney={() => setShowAddMoney(true)}
                                onWithdraw={() => setShowWithdraw(true)}

                            />

                            <TransactionList
                                transactions={wallet.recentTransactions}
                                onViewAll={() => console.log("Navigate to all transactions")}
                            />

                        </main>
                    </div>
                </DashboardLayout>
            </DashboardProvider>
        </>
    );
};

export default AdminWallet

const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
);

const WalletSkeleton = () => {
    return (
        <div className="pt-[78px] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">

                {/* Wallet Card */}
                <div className="bg-white rounded-3xl shadow-md p-6">
                    <Skeleton className="h-6 w-40 mb-6" />

                    <Skeleton className="h-10 w-52 mb-4" />

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <Skeleton className="h-4 w-28 mb-2" />
                            <Skeleton className="h-8 w-36" />
                        </div>

                        <div>
                            <Skeleton className="h-4 w-28 mb-2" />
                            <Skeleton className="h-8 w-36" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32 rounded-xl" />
                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>
                </div>

                {/* Transactions */}
                <div className="bg-white rounded-3xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <Skeleton className="h-6 w-44" />
                        <Skeleton className="h-5 w-20" />
                    </div>

                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between py-4 border-b last:border-b-0"
                        >
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />

                                <div>
                                    <Skeleton className="h-4 w-40 mb-2" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>

                            <div className="text-right">
                                <Skeleton className="h-5 w-24 mb-2 ml-auto" />
                                <Skeleton className="h-3 w-16 ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
};