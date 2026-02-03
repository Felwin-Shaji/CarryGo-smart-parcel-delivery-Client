import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export const usePayment = () => {

    const axiosInstance = useAxios();
    const navigate = useNavigate();


    const initiatePayment = async (bookingId: string) => {
        const res = await axiosInstance.post(
            `/api/user/booking/${bookingId}/payment/order`
        );

        return res.data.data;
    };

    const verifyPayment = async (response: any, referenceId: string) => {
        const res = await axiosInstance.post(
            "/api/user/booking/payment/verify",
            {
                referenceId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            }
        );

        navigate(`/booking/${referenceId}/success`);

console.log(res.data.message)
    }

    return {
        initiatePayment,
        verifyPayment
    }
}