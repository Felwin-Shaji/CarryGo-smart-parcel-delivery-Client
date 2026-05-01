import { API_ADMIN } from "../../shared/constants_Types/apiRoutes";
import type { WalletOverview } from "../../shared/constants_Types/types/walletType";
import { useAxios } from "../../hooks/useAxios";

export const useAdminWallet = () => {
    const axiosInstance = useAxios();

    const getWallet = async () => {
        const res = await axiosInstance.get(API_ADMIN.GET_WALLET);

        console.log(res.data.data)

        return res.data.data as WalletOverview
    };

    const createWalletOrder = async (amount: number) => {
        const res = await axiosInstance.post(
            API_ADMIN.CREATE_ORDER_WALLET,
            { amount }
        )

        return res.data.data
    }


    const withdrawMoney = async (amount: number) => {
        const res = await axiosInstance.post(
            API_ADMIN.WITHDRAW_WALLET,
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