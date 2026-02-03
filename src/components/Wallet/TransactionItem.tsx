import type { Transaction } from "../../constants_Types/types/walletType";
import { getTransactionIcon, getTransactionStyles } from "./wallet.utils";

export type TransactionItem = {
    tx:Transaction
}


export const TransactionItem = ({tx}:TransactionItem) => {
    const styles = getTransactionStyles(tx.type, tx.status);

    return (
        <li className="group flex justify-between items-center px-6 py-4 hover:bg-gray-50/80 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`h-11 w-11 rounded-2xl ${styles.iconBg} ${styles.iconColor} flex items-center justify-center`}>
                    {getTransactionIcon(tx.type)}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">
                        {tx.type}
                    </p>
                    <p className="text-sm text-gray-500">
                        {tx.reason} • {tx.id}
                    </p>
                </div>
            </div>

            <p className={`font-bold text-lg ${styles.amountColor}`}>
                {styles.prefix}₹{tx.amount.toLocaleString()}
            </p>
        </li>
    );
};
