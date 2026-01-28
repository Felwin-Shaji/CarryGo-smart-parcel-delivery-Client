import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { openRazorpayCheckout } from "../../Services/Payment/razorpay";
import { usePayment } from "../../Services/Payment/usePayment";
import toast from "react-hot-toast";

const BookingPaymentPage = () => {
    const { bookingId } = useParams();

    const { initiatePayment, verifyPayment } = usePayment();

    const navigate = useNavigate()

    useEffect(() => {
        startPayment();
    }, []);

    const startPayment = async () => {
        const res = await initiatePayment(bookingId!);

        const { orderId, amount, currency, key } = res;

        openRazorpayCheckout({
            key,
            orderId,
            amount,
            currency,
            bookingId: bookingId!,
            onSuccess: verifyPayment,
            onFailure: () => {
                toast.error("Payment cancelled");
                navigate("/user/booking")
            },
        });
    };

    return <p className="text-center mt-20">Opening payment gateway…</p>;
};

export default BookingPaymentPage;
