export type TransactionType =
  | "CREDIT"
  | "DEBIT"
  | "HOLD"
  | "RELEASE";

export type TransactionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED";


export type Transaction =  {
  id: string;
  type: TransactionType;
  reason: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

export type WalletOverview = {
  balance: number;
  lockedBalance: number;
  recentTransactions: Transaction[];
}