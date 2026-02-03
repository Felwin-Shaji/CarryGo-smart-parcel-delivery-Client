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

export const getTransactionStyles = (type: string, status: string) => {
  if (status === "processing") {
    return {
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      amountColor: "text-amber-600",
      prefix: ""
    };
  }

  switch (type.toLowerCase()) {
    case "credit":
      return {
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        amountColor: "text-emerald-600",
        prefix: "+"
      };
    case "debit":
      return {
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
        amountColor: "text-rose-600",
        prefix: "-"
      };
    default:
      return {
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
        amountColor: "text-gray-600",
        prefix: ""
      };
  }
};
