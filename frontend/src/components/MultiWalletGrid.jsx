import React from 'react';
import { Wallet, CreditCard, Smartphone, ArrowUpRight, ArrowDownRight, PlusCircle, ShieldCheck } from 'lucide-react';

export default function MultiWalletGrid({ activeTheme, wallets, setWallets, transactions }) {

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
        return <Wallet className="w-5 h-5" />;
      case 'Bank BCA':
      case 'Bank Mandiri':
      case 'Bank BNI':
        return <CreditCard className="w-5 h-5" />;
      case 'Gopay':
      case 'Ovo':
      case 'QRIS':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Total Balance Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-accent)' }}>
            FR-05 Manajemen Multi-Wallet
          </h2>
          <p className="text-xs sm:text-sm font-semibold opacity-75 mt-0.5">
            Integrasi saldo dompet tunai, perbankan, dan e-wallet terkoneksi secara otomatis.
          </p>
        </div>

        <div className={`px-5 py-3 rounded-2xl border flex items-center space-x-3.5 shadow-xs ${
          activeTheme === 'lumi' 
            ? 'bg-white border-orange-200 text-slate-900' 
            : 'bg-[#1E293B] border-slate-700 text-white'
        }`}>
          <ShieldCheck className={`w-6 h-6 ${activeTheme === 'lumi' ? 'text-orange-500' : 'text-slate-300'}`} />
          <div>
            <span className="block text-xs font-black uppercase opacity-75">Total Saldo Gabungan</span>
            <span className="text-lg font-black text-orange-600 dark:text-white">
              {formatRupiah(Object.values(wallets).reduce((a, b) => a + b, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Wallet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(wallets).map(([walletName, balance]) => {
          const walletTxCount = transactions.filter(t => t.account === walletName || t.account.includes(walletName)).length;

          return (
            <div
              key={walletName}
              className={`p-6 rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 ${
                activeTheme === 'lumi'
                  ? 'bg-white hover:bg-orange-50/40 border-orange-200'
                  : 'bg-[#1E293B] hover:bg-slate-800 border-slate-700'
              }`}
            >
              
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3.5 rounded-2xl ${
                    activeTheme === 'lumi' 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-slate-700 text-white'
                  }`}>
                    {getWalletIcon(walletName)}
                  </div>
                  <div>
                    <h3 className="text-base font-black">{walletName}</h3>
                    <span className="text-xs font-bold opacity-75">{walletTxCount} transaksi</span>
                  </div>
                </div>

                <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                  activeTheme === 'lumi' 
                    ? 'bg-orange-100 text-orange-900 border-orange-300' 
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}>
                  Terhubung
                </span>
              </div>

              {/* Saldo Display */}
              <div>
                <span className="block text-xs font-black uppercase opacity-75">Saldo Aktif</span>
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {formatRupiah(balance)}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm font-bold">
                <span className="opacity-75">Mutasi Otomatis</span>
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
                  className={`flex items-center gap-1.5 font-black hover:underline ${
                    activeTheme === 'lumi' ? 'text-orange-600' : 'text-slate-300'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  Top Up Saldo
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
