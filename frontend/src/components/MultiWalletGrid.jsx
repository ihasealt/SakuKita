import { Wallet, CreditCard, Smartphone, PlusCircle, ShieldCheck } from 'lucide-react';

export default function MultiWalletGrid({ wallets, setWallets, transactions }) {

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const getWalletIcon = (name) => {
    switch (name) {
      case 'Tunai':
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      case 'Bank BCA':
      case 'Bank Mandiri':
      case 'Bank Seabank':
        return <CreditCard className="w-4 h-4 text-sky-600" />;
      case 'Gopay':
      case 'Ovo':
      case 'QRIS':
        return <Smartphone className="w-4 h-4 text-indigo-600" />;
      default:
        return <Wallet className="w-4 h-4 persona-accent-text" />;
    }
  };

  const totalBalance = Object.values(wallets).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4 animate-fade-in">
      
      {/* Header & Total Balance Summary */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-800 flex items-center gap-2" style={{ fontFamily: 'var(--font-accent)' }}>
            <Wallet className="w-5 h-5 persona-accent-text" />
            FR-05 Manajemen Multi-Wallet
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Integrasi saldo kas tunai, perbankan, dan e-wallet yang terhubung otomatis
          </p>
        </div>

        <div className="persona-accent-soft flex items-center space-x-2.5 rounded-xl border border-[var(--surface-border)] px-4 py-2">
          <ShieldCheck className="w-5 h-5" />
          <div>
            <span className="block text-[10px] font-black uppercase">Total Saldo Gabungan</span>
            <span className="text-sm font-black tracking-tight md:text-base">
              {formatRupiah(totalBalance)}
            </span>
          </div>
        </div>
      </div>

      {/* Wallet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Object.entries(wallets).map(([walletName, balance]) => {
          const walletTxCount = transactions.filter(t => t.account === walletName || t.account.includes(walletName)).length;

          return (
            <div
              key={walletName}
              className="persona-accent-hover flex flex-col justify-between space-y-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all"
            >
              {/* Top Row: Icon & Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getWalletIcon(walletName)}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800">{walletName}</h3>
                    <span className="text-[10px] font-semibold text-slate-400">{walletTxCount} transaksi</span>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Aktif
                </span>
              </div>

              {/* Saldo Display */}
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-400">Saldo Saat Ini</span>
                <span className="text-base font-black tracking-tight text-slate-900">
                  {formatRupiah(balance)}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-[11px] text-slate-400">Auto-sync</span>
                <button
                  onClick={() => {
                    const amount = prompt(`Tambah saldo untuk ${walletName} (Rp):`);
                    if (amount && !isNaN(amount)) {
                      setWallets(prev => ({
                        ...prev,
                        [walletName]: prev[walletName] + parseFloat(amount)
                      }));
                    }
                  }}
                  className="persona-accent-text flex items-center gap-1 text-[11px] font-black"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Top Up</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
