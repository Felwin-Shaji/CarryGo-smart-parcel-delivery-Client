import type { TransactionType, TransactionStatus } from "../../constants_Types/types/walletType";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

export const getTransactionIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "credit":
      return <ArrowDownLeft className="h-4 w-4" />;
    case "debit":
      return <ArrowUpRight className="h-4 w-4" />;
    case "withdrawal":
      return <Clock className="h-4 w-4" />;
    default:
      return <ArrowDownLeft className="h-4 w-4" />;
  }
};


export const getTransactionStyles = (
  type: TransactionType,
  status: TransactionStatus
) => {
  // Pending overrides everything
  if (status === "PENDING") {
    return {
      iconBg: "bg-amber-100",
      iconText: "text-amber-600",
      amountText: "text-amber-600",
      prefix: ""
    };
  }

  switch (type) {
    case "CREDIT":
      return {
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-600",
        amountText: "text-emerald-600",
        prefix: "+"
      };

    case "DEBIT":
      return {
        iconBg: "bg-rose-100",
        iconText: "text-rose-600",
        amountText: "text-rose-600",
        prefix: "-"
      };

    case "HOLD":
      return {
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        amountText: "text-blue-600",
        prefix: "−"
      };

    case "RELEASE":
      return {
        iconBg: "bg-indigo-100",
        iconText: "text-indigo-600",
        amountText: "text-indigo-600",
        prefix: "+"
      };

    default:
      return {
        iconBg: "bg-gray-100",
        iconText: "text-gray-600",
        amountText: "text-gray-600",
        prefix: ""
      };
  }
};
