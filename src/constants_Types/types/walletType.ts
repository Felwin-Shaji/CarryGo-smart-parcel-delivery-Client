export type Transaction =  {
  id: string;
  type: string;
  reason: string;
  amount: number;
  status: string;
  createdAt: string;
}

export type WalletOverview = {
  balance: number;
  lockedBalance: number;
  recentTransactions: Transaction[];
}