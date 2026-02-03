import type { Roles } from "../../constants_Types/types/roles";

export const openRazorpayCheckout = (options: {
  key: string;
  orderId: string;
  amount: number;
  currency: string;
  role:Roles;

  title: string;
  description: string;

  referenceId?: string; // bookingId / walletTopupId

  onSuccess: (response: any, referenceId?: string) => void;
  onFailure?: () => void;
}) => {
  const razorpay = new (window as any).Razorpay({
    key: options.key,
    order_id: options.orderId,
    amount: options.amount,
    currency: options.currency,
    role:options.role,

    name: options.title,
    description: options.description,

    handler: (response: any) => {
      options.onSuccess(response, options.referenceId);
    },

    modal: {
      ondismiss: options.onFailure,
    },

    theme: {
      color: "#000000",
    },
  });

  razorpay.open();
};
