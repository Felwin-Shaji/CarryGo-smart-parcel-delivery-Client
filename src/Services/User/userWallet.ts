import { API_USER } from "../../constants_Types/apiRoutes";
import type { WalletOverview } from "../../constants_Types/types/walletType";
import { useAxios } from "../../hooks/useAxios";

export const useUserWallet = () => {
    const axiosInstance = useAxios();

    const getWallet = async () => {
        const res = await axiosInstance.get(API_USER.GET_WALLET);

        console.log(res.data.data)

        return res.data.data as WalletOverview
    };

    const createWalletOrder = async (amount: number) => {
        const res = await axiosInstance.post(
            API_USER.CREATE_ORDER_WALLET,
            { amount }
        )

        return res.data.data
    }

    const withdrawMoney = async (amount: number) => {
        const res = await axiosInstance.post(
            API_USER.WITHDRAW_WALLET,
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