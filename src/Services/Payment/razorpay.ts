export const openRazorpayCheckout = (options: {
  key: string;
  orderId: string;
  amount: number;
  currency: string;
  bookingId: string;
  onSuccess: (response: any,bookingId:string) => void;
  onFailure?: () => void;
}) => {
  const razorpay = new (window as any).Razorpay({
    key: options.key,
    order_id: options.orderId,
    amount: options.amount,
    currency: options.currency,

    name: "CarryGo",
    description: "Parcel Delivery Payment",

    handler: options.onSuccess,

    modal: {
      ondismiss: options.onFailure,
    },

    theme: {
      color: "#000000",
    },
  });

  razorpay.open();
};
