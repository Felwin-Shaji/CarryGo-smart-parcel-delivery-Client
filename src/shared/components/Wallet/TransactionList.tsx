import { ChevronRight } from "lucide-react";
import { TransactionItem } from "./TransactionItem";
import type { Transaction } from "../../constants_Types/types/walletType";

interface TransactionListProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

export const TransactionList = ({ transactions, onViewAll }: TransactionListProps) => {
  return (
    <section className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-6 pb-4">
        <h3 className="text-lg font-bold text-[var(--color-primary)]">
          Recent Transactions
        </h3>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-medium"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <p className="px-6 pb-6 text-sm text-gray-500">
          No transactions yet
        </p>
      ) : (
        <ul className="divide-y divide-gray-50">
          {transactions.map(tx => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
        </ul>
      )}
    </section>
  );
};
