import { Sparkles, TrendingUp, Shield } from "lucide-react";

interface WalletCardProps {
  balance: number;
  lockedBalance?: number;

  showAddMoney?: boolean;
  showWithdraw?: boolean;

  onAddMoney?: () => void;
  onWithdraw?: () => void;
}

export const WalletCard = ({
  balance,
  lockedBalance = 0,

  showAddMoney = false,
  showWithdraw = false,

  onAddMoney,
  onWithdraw,
}: WalletCardProps) => {
  return (
    <section className="relative rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-xl overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative p-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            Available Balance
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Active
          </span>
        </div>

        {/* Balance */}
        <div>
          <h1 className="text-[42px] font-semibold tracking-tight text-white/80 leading-none">
            ₹{balance.toLocaleString()}
            <span className="text-white/60 text-2xl">.00</span>
          </h1>

          {lockedBalance > 0 && (
            <p className="mt-1 text-sm text-amber-300">
              ₹{lockedBalance.toLocaleString()} locked
            </p>
          )}

          <div className="mt-2 flex items-center gap-2 text-sm text-emerald-300">
            <TrendingUp className="h-4 w-4" />
            Wallet active
          </div>
        </div>

        {/* Actions (Optional) */}
        {(showAddMoney || showWithdraw) && (
          <div className="flex gap-3">
            {showAddMoney && (
              <button
                onClick={onAddMoney}
                className="flex-1 rounded-xl bg-[var(--color-accent)] py-3 font-semibold text-[var(--color-primary)]
                  transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Add Money
              </button>
            )}

            {showWithdraw && (
              <button
                onClick={onWithdraw}
                className="flex-1 rounded-xl border border-white/20 bg-white/10 py-3 font-semibold
                  backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Withdraw
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Secured wallet
          </div>
          <span>Updated just now</span>
        </div>

      </div>
    </section>
  );
};
