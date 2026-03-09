import type { RazorpayError, RazorpayFailureResponse, RazorpaySuccessResponse } from "../../constants_Types/types/razorpay";
import type { Roles } from "../../constants_Types/types/roles";

export const openRazorpayCheckout = (options: {
  key: string;
  orderId: string;
  amount: number;
  currency: string;
  role: Roles;

  title: string;
  description: string;

  referenceId?: string;

  onSuccess: (response: RazorpaySuccessResponse, referenceId?: string) => void;
  onFailure?: (error?: RazorpayError | { reason: string }) => void;
}) => {

  let handled = false;

  const razorpay = new (window as any).Razorpay({

    key: options.key,
    order_id: options.orderId,
    amount: options.amount,
    currency: options.currency,

    name: options.title,
    description: options.description,

    handler: (response: RazorpaySuccessResponse) => {
      if (handled) return;
      handled = true;

      options.onSuccess(response, options.referenceId);
    },

    modal: {
      ondismiss: () => {
        if (handled) return;
        handled = true;

        options.onFailure?.({
          reason: "User closed payment popup",
        });
      },
    },

    retry: {
      enabled: true,
      max_count: 3,
    },

    theme: {
      color: "#000000",
    },
  });

  razorpay.on("payment.failed", (response: RazorpayFailureResponse) => {

    if (handled) return;
    handled = true;

    options.onFailure?.(response.error);
  });

  razorpay.open();
};