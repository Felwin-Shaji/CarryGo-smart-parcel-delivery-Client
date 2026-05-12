import { useEffect, useState } from "react";
import { useUserWallet } from "../../Services/User/userWallet";
import type { WalletOverview } from "../../shared/constants_Types/types/walletType";
import LoadingScreen from "../../shared/components/loading/CarryGoLoadingScreen";
import { Header } from "./components/Header";
import { WalletCard } from "../../shared/components/Wallet/WalletCard";
import { TransactionList } from "../../shared/components/Wallet/TransactionList";
import toast from "react-hot-toast";
import { openRazorpayCheckout } from "../../Services/Payment/razorpay";
import { AddMoneyModal } from "../../shared/components/Wallet/AddMoneyModal";
import { WithdrawMoneyModal } from "../../shared/components/Wallet/WithdrawMoneyModal";

const UserWallet = () => {
    const { getWallet, createWalletOrder, withdrawMoney } = useUserWallet();
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
            role: "user",

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

    if (loading) return <LoadingScreen />;

    if (!wallet) return <div>No wallet data</div>;

    return (
        <>
            <Header isLoggedIn />

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

            <div className="pt-[78px] min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
        </>
    );
};

export default UserWallet
