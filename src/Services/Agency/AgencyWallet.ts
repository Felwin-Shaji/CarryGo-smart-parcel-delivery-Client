// import { API_ADMIN } from "../../constants_Types/apiRoutes";
import { API_AGENCY } from "../../constants_Types/apiRoutes";
import type { WalletOverview } from "../../constants_Types/types/walletType";
import { useAxios } from "../../hooks/useAxios";

export const useAgencyWallet = () => {
    const axiosInstance = useAxios();

    const getWallet = async () => {
        const res = await axiosInstance.get(API_AGENCY.GET_WALLET);

        console.log(res.data.data)

        return res.data.data as WalletOverview
    };

    const createWalletOrder = async (amount: number) => {
        const res = await axiosInstance.post(
            API_AGENCY.CREATE_ORDER_WALLET,
            { amount }
        )

        return res.data.data
    }

    return {
        getWallet,
        createWalletOrder
    }
}