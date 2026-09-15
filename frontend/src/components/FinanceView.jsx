import React, { useState, useMemo } from 'react';
import { Plus, Filter, CheckSquare, Square, Trash2, ArrowUpRight, Wallet, AlertCircle } from 'lucide-react';

export default function FinanceView({ transactions, setTransactions, onOpenAddModal, searchTerm }) {
  const [selectedAccountFilter, setSelectedAccountFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [activeAccount, setActiveAccount] = useState('Cash');

  // Account budget baselines
  const accountBudgets = {
    Cash: 1600000,
    Gopay: 500000,
    'Bank BNI': 2500000,
    'Bank Mandiri': 3500000,
    'Bank Seabank': 1200000,
  };

  // Filtered transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter(item => {
      const matchesSearch = item.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAccount = selectedAccountFilter === 'All' || item.account === selectedAccountFilter;
      const matchesCategory = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
      
      return matchesSearch && matchesAccount && matchesCategory;
    });
  }, [transactions, searchTerm, selectedAccountFilter, selectedCategoryFilter]);

  // Dynamic Metrics Calculation
  const totalExpenses = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [transactions]);

  const activeAccountExpenses = useMemo(() => {
    return transactions
      .filter(t => t.account === activeAccount)
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [transactions, activeAccount]);

  const currentBudget = accountBudgets[activeAccount] || 1600000;
  const currentSisa = currentBudget - activeAccountExpenses;
  const allocatedPercent = Math.min(100, Math.round((activeAccountExpenses / currentBudget) * 100));
  const unallocatedPercent = 100 - allocatedPercent;

  // Toggle selection checkbox
  const toggleCheckbox = (id) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    const allChecked = filteredTransactions.every(t => t.checked);
    setTransactions(prev =>
      prev.map(t => {
        if (filteredTransactions.some(ft => ft.id === t.id)) {
          return { ...t, checked: !allChecked };
        }
        return t;
      })
    );
  };

  const deleteSelected = () => {
    setTransactions(prev => prev.filter(t => !t.checked));
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num).replace('Rp', 'Rp');
  };

  // Category Badge Styles (Reference 1 color scheme)
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Giving':
        return 'bg-[#DCECC9] text-[#3D5A1E] border border-[#BDE099]';
      case 'Playing':
        return 'bg-[#F8D9C0] text-[#8A4310] border border-[#F2B98E]';
      case 'Savings':
        return 'bg-[#CBE6F6] text-[#195277] border border-[#99CCE6]';
      case 'Living':
        return 'bg-[#DCD0F0] text-[#532C8C] border border-[#BCA6E5]';
      default:
        return 'bg-slate-100 text-slate-800 border border-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-fade-in" style={{ fontFamily: 'var(--font-primary)' }}>
      
      {/* ========================================================================= */}
      {/* 1. TOP BANNER HEADER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-slate-800 dark:to-slate-900 text-white border border-orange-400 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🍀</span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans text-white">
                Pantau Laporan Keuangan SakuKita
              </h1>
            </div>
            <p className="text-sm sm:text-base font-bold opacity-90 mt-1.5 leading-relaxed">
              Catatan transaksi terkini & alokasi anggaran otomatis terintegrasi.
            </p>
          </div>

          <div className="bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white border border-white/40 dark:border-slate-700 px-6 py-3.5 rounded-2xl flex flex-col items-end shadow-md backdrop-blur-sm">
            <span className="text-xs font-black uppercase text-orange-700 dark:text-slate-300 flex items-center gap-1">
              Total Pengeluaran &rarr;
            </span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
              {formatRupiah(totalExpenses)}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. OVERVIEW CARDS DUAL BOX GRID */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Account & Budget Calculator Card (Dual Box Left) */}
        <div className="md:col-span-2 bg-white dark:bg-[#1E293B] border border-orange-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="flex items-center space-x-3.5 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xl shadow-xs">
              🟡
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight">Kalkulator Anggaran per Dompet</h3>
              <p className="text-xs sm:text-sm font-bold opacity-70">Pilih akun dompet untuk melihat sisa limit alokasi</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Account Selector */}
            <div className="bg-orange-50/40 dark:bg-slate-900 p-4 rounded-2xl border border-orange-200 dark:border-slate-700">
              <label className="block text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Account / Dompet
              </label>
              <div className="relative">
                <select
                  value={activeAccount}
                  onChange={(e) => setActiveAccount(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-extrabold text-sm sm:text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 appearance-none shadow-2xs"
                >
                  <option value="Cash">Cash (Tunai)</option>
                  <option value="Gopay">Gopay</option>
                  <option value="Bank BNI">Bank BNI</option>
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="Bank Seabank">Bank Seabank</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Budget Display */}
            <div className="bg-orange-50/40 dark:bg-slate-900 p-4 rounded-2xl border border-orange-200 dark:border-slate-700 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Budget ({activeAccount})
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white text-right">
                {formatRupiah(currentBudget)}
              </span>
            </div>

            {/* Expenses Display */}
            <div className="bg-orange-50/40 dark:bg-slate-900 p-4 rounded-2xl border border-orange-200 dark:border-slate-700 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Expenses
              </span>
              <span className="text-xl sm:text-2xl font-black text-rose-600 text-right">
                {formatRupiah(activeAccountExpenses)}
              </span>
            </div>

            {/* Sisa Display */}
            <div className="bg-orange-100/70 dark:bg-slate-800 p-4 rounded-2xl border border-orange-300 dark:border-slate-600 flex flex-col justify-between">
              <span className="text-xs sm:text-sm font-black text-orange-950 dark:text-slate-200 uppercase tracking-wider">
                Sisa Anggaran
              </span>
              <span className="text-xl sm:text-2xl font-black text-orange-900 dark:text-white text-right">
                {formatRupiah(currentSisa)}
              </span>
            </div>

          </div>

          {/* Alert Bar */}
          <div className="bg-orange-50/80 dark:bg-slate-900 border border-orange-200 dark:border-slate-700 p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🐈</span>
              <span>Jangan lupa catat pengeluaran harianmu ya!</span>
            </div>
            <button
              onClick={onOpenAddModal}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition shadow-xs"
            >
              + Catat Sekarang
            </button>
          </div>

        </div>

        {/* Note & Allocation Breakdown (Dual Box Right) */}
        <div className="bg-white dark:bg-[#1E293B] border border-orange-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xl shadow-xs">
                  📊
                </div>
                <h3 className="text-lg font-black tracking-tight">Rasio Alokasi</h3>
              </div>
              <span className="text-xs font-bold text-slate-400">Auto-calculated</span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>Total Budget:</span>
                <span className="font-black text-slate-900 dark:text-white">{formatRupiah(currentBudget)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>% Teralokasikan:</span>
                <span className="font-black text-orange-600 dark:text-slate-300">{allocatedPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-500 dark:bg-slate-400 h-full transition-all duration-500"
                  style={{ width: `${allocatedPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>% Sisa Anggaran:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">{unallocatedPercent}%</span>
              </div>
            </div>
          </div>

          {/* Metrics Footer */}
          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-orange-50/40 dark:bg-slate-900 p-3 rounded-2xl border border-orange-200 dark:border-slate-700 text-center">
              <span className="block text-xs font-black uppercase text-slate-400">TOTAL TAGIHAN</span>
              <span className="text-base font-black text-slate-900 dark:text-white">Rp 0</span>
            </div>
            <div className="bg-orange-50/40 dark:bg-slate-900 p-3 rounded-2xl border border-orange-200 dark:border-slate-700 text-center">
              <span className="block text-xs font-black uppercase text-slate-400">TOTAL HUTANG</span>
              <span className="text-base font-black text-slate-900 dark:text-white">Rp 0</span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. TRANSACTION TABLE */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-[#1E293B] border border-orange-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm">
        
        {/* Table Controls & Filter Bar */}
        <div className="bg-orange-100/80 dark:bg-slate-900 px-6 py-4 border-b border-orange-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3">
            <span className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-wider font-sans uppercase">
              DAFTAR PENGELUARAN
            </span>
            <span className="bg-orange-500 text-white dark:bg-slate-700 text-xs font-black px-3 py-1 rounded-full border border-orange-400 dark:border-slate-600">
              {filteredTransactions.length} transaksi
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-3 w-full sm:w-auto justify-end">
            
            {/* Filter Account */}
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              <Filter className="w-4 h-4 text-orange-500" />
              <span>Akun:</span>
              <select
                value={selectedAccountFilter}
                onChange={(e) => setSelectedAccountFilter(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold focus:outline-none"
              >
                <option value="All">Semua Akun</option>
                <option value="Cash">Cash</option>
                <option value="Gopay">Gopay</option>
                <option value="Bank BNI">Bank BNI</option>
                <option value="Bank Mandiri">Bank Mandiri</option>
                <option value="Bank Seabank">Bank Seabank</option>
              </select>
            </div>

            {/* Filter Category */}
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
              <span>Kategori:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold focus:outline-none"
              >
                <option value="All">Semua Kategori</option>
                <option value="Giving">Giving</option>
                <option value="Playing">Playing</option>
                <option value="Savings">Savings</option>
                <option value="Living">Living</option>
              </select>
            </div>

            {/* Delete Selected Button */}
            {transactions.some(t => t.checked) && (
              <button
                onClick={deleteSelected}
                className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 shadow-2xs"
              >
                <Trash2 className="w-4 h-4" />
                Hapus Terpilih
              </button>
            )}

            {/* Add Expense Button */}
            <button
              onClick={onOpenAddModal}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              + Catat Pengeluaran
            </button>

          </div>

        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50 dark:bg-slate-900/80 text-slate-900 dark:text-slate-200 text-xs sm:text-sm font-black uppercase border-b border-orange-200 dark:border-slate-800">
                <th className="py-3.5 px-4 w-12 text-center">
                  <button onClick={toggleSelectAll} className="focus:outline-none">
                    {filteredTransactions.length > 0 && filteredTransactions.every(t => t.checked) ? (
                      <CheckSquare className="w-5 h-5 text-orange-600 dark:text-slate-300" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4 w-36">Tanggal</th>
                <th className="py-3.5 px-4">Detail</th>
                <th className="py-3.5 px-4 w-40 text-right">Nominal</th>
                <th className="py-3.5 px-4 w-40">Akun</th>
                <th className="py-3.5 px-4 w-36">Kategori</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm sm:text-base font-bold">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400 text-base font-semibold">
                    Tidak ada transaksi ditemukan. Silakan tambah transaksi baru.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`transition-colors duration-150 ${item.checked ? 'bg-orange-50/70 dark:bg-slate-800/80' : 'hover:bg-orange-50/30 dark:hover:bg-slate-800/40'}`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <button onClick={() => toggleCheckbox(item.id)} className="focus:outline-none">
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-orange-600 dark:text-slate-300" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                        )}
                      </button>
                    </td>

                    {/* Tanggal */}
                    <td className="py-3.5 px-4 font-extrabold text-slate-600 dark:text-slate-300 text-xs sm:text-sm whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Detail */}
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">
                      {item.detail}
                    </td>

                    {/* Nominal */}
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white text-right whitespace-nowrap">
                      {formatRupiah(item.amount)}
                    </td>

                    {/* Akun Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1">
                        <Wallet className="w-3.5 h-3.5 text-orange-500" />
                        {item.account}
                      </span>
                    </td>

                    {/* Kategori Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-black ${getCategoryBadgeClass(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Bar */}
        <div className="bg-orange-50/60 dark:bg-slate-900 px-6 py-3.5 border-t border-orange-200 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200">
          <span>Menampilkan {filteredTransactions.length} dari {transactions.length} total item</span>
          <span>Total Terpilih: {formatRupiah(filteredTransactions.filter(t => t.checked).reduce((acc, c) => acc + c.amount, 0))}</span>
        </div>

      </div>

    </div>
  );
}
