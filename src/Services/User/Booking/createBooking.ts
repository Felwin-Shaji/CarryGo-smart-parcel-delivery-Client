import toast from "react-hot-toast";
import { API_USER } from "../../../constants_Types/apiRoutes";
import { useAxios } from "../../../hooks/useAxios";

export const useBooking = () => {
    const axiosInstance = useAxios();

    const isPincodeValied = async (values: { fromPincode: string, toPincode: string }) => {
        const res = await axiosInstance.post(API_USER.BOOKING_PINCODE_VALIDATE, values);

        if (res.data.success) toast.success("Picode is avilable ");
        return res.data.data;
    };

    return {
        isPincodeValied
    }
}