import { useEffect, useState } from "react";
import type { WalletOverview } from "../../constants_Types/types/walletType";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { WalletCard } from "../../components/Wallet/WalletCard";
import { TransactionList } from "../../components/Wallet/TransactionList";
import toast from "react-hot-toast";
import { openRazorpayCheckout } from "../../Services/Payment/razorpay";
import { AddMoneyModal } from "../../components/Wallet/AddMoneyModal";
import { useAdminWallet } from "../../Services/Admin/AdminWallet";
import { DashboardProvider } from "../../context/DashboardProvider";
import { DashboardLayout } from "../../layouts/DashboardLayout";

const AdminWallet = () => {
    const { getWallet, createWalletOrder } = useAdminWallet();
    const [wallet, setWallet] = useState<WalletOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAddMoney, setShowAddMoney] = useState(false);


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

    function handleWithdraw() {
        toast.success('Monay withdrewed')
    }

    useEffect(() => {
        getWallet()
            .then(setWallet)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingScreen />;

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

                    <div className="pt-[78px] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                        <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">

                            <WalletCard
                                balance={wallet.balance}
                                lockedBalance={wallet.lockedBalance}
                                showAddMoney={true}
                                showWithdraw={true}
                                onAddMoney={() => setShowAddMoney(true)}
                                onWithdraw={() => handleWithdraw()}
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
