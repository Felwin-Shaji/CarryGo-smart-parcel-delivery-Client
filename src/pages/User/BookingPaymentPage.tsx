import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { openRazorpayCheckout } from "../../Services/Payment/razorpay";
import { usePayment } from "../../Services/Payment/usePayment";
import toast from "react-hot-toast";

const BookingPaymentPage = () => {
    const { bookingId } = useParams();

    const { initiatePayment, verifyPayment, paymentCancelled } = usePayment();


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
            role: "user",
            title: "CarryGo",
            description: "Parcel Delivery Payment",
            referenceId: bookingId,
            onSuccess: (response, bookingId) => {
                verifyPayment(response, bookingId!);
            },
            onFailure: async (error) => {

                if (error) {
                    toast.error( "Payment failed");
                } else {
                    toast.error("Payment cancelled");
                }

                await paymentCancelled(bookingId!, error);
            }
        });
    };

    return <p className="text-center mt-20">Opening payment gateway…</p>;
};

export default BookingPaymentPage;
