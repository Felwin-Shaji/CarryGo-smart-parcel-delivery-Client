import type { Transaction } from "../../constants_Types/types/walletType";
// import { getTransactionIcon } from "./wallet.icons";
import { getTransactionIcon, getTransactionStyles } from "./wallet.utils";

type Props = {
  tx: Transaction;
};

export const TransactionItem = ({ tx }: Props) => {
  const styles = getTransactionStyles(tx.type, tx.status);

  return (
    <li
      className="
        flex items-center justify-between
        rounded-xl px-5 py-4
        transition-colors
        hover:bg-slate-50
      "
    >
      {/* Left */}
      <div className="flex items-start gap-4">
        <div
          className={`
            h-10 w-10 rounded-xl
            ${styles.iconBg} ${styles.iconText}
            flex items-center justify-center
            shrink-0
          `}
        >
          {getTransactionIcon(tx.type)}
        </div>

        <div className="space-y-0.5">
          <p className="text-sm font-medium text-gray-900">
            {tx.reason}
          </p>
          <p className="text-xs text-gray-500">
            {tx.id} • {new Date(tx.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Right */}
      <p
        className={`
          text-base font-semibold
          ${styles.amountText}
          tabular-nums
        `}
      >
        {styles.prefix}₹{tx.amount.toLocaleString("en-IN")}
      </p>
    </li>
  );
};
