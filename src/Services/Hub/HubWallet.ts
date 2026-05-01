import { API_HUB } from "../../shared/constants_Types/apiRoutes";
import type { WalletOverview } from "../../shared/constants_Types/types/walletType";
import { useAxios } from "../../hooks/useAxios";

export const useHubWallet = () => {
    const axiosInstance = useAxios();

    const getWallet = async () => {
        const res = await axiosInstance.get(API_HUB.GET_WALLET);

        console.log(res.data.data)

        return res.data.data as WalletOverview
    };

    const createWalletOrder = async (amount: number) => {
        const res = await axiosInstance.post(
            API_HUB.CREATE_ORDER_WALLET,
            { amount }
        )

        return res.data.data
    }

        const withdrawMoney = async (amount: number) => {
            const res = await axiosInstance.post(
                API_HUB.WITHDRAW_WALLET,
                { amount }
            );
    
            return res.data.data;
        };

    return {
        getWallet,
        createWalletOrder,
        withdrawMoney
    }
}