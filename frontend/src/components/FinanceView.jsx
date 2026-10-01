import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Filter, 
  CheckSquare, 
  Square, 
  Trash2, 
  Wallet, 
  ReceiptText, 
  TrendingDown, 
  CheckCircle2, 
  Search,
  ArrowUpDown,
  Tag
} from 'lucide-react';

export default function FinanceView({ transactions, setTransactions, onOpenAddModal, searchTerm }) {
  const [selectedAccountFilter, setSelectedAccountFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  // Account budget baselines
  const accountBudgets = {
    Cash: 1600000,
    Gopay: 500000,
    'Bank BNI': 2500000,
    'Bank Mandiri': 3500000,
    'Bank Seabank': 1200000,
  };

  // Filtered transactions
  const effectiveSearch = localSearch || searchTerm || '';
  const filteredTransactions = useMemo(() => {
    return transactions.filter(item => {
      const matchesSearch = item.detail.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
                            item.account.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
                            item.category.toLowerCase().includes(effectiveSearch.toLowerCase());
      
      const matchesAccount = selectedAccountFilter === 'All' || item.account === selectedAccountFilter;
      const matchesCategory = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
      
      return matchesSearch && matchesAccount && matchesCategory;
    });
  }, [transactions, effectiveSearch, selectedAccountFilter, selectedCategoryFilter]);

  // Metrics Calculation
  const totalExpenses = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [transactions]);

  const currentBudget = 1600000;
  const currentSisa = Math.max(0, currentBudget - totalExpenses);

  const toggleCheckbox = (id) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

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

  const deleteSingle = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Modern Clean Category Pill Badges
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Giving':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Playing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Savings':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Living':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      
      {/* 1. COMPACT TOP HEADER & QUICK METRICS BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-slate-800 tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-accent)' }}>
            <ReceiptText className="w-5 h-5 text-teal-600" />
            Riwayat Transaksi & Pembukuan Kas
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Kelola log pengeluaran, filter kategori, dan pantau pengeluaran dompet
          </p>
        </div>

        {/* 3 Compact Metric Badges Inline */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-1.5 text-xs font-bold">
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            <span>Pengeluaran: <strong className="font-black text-rose-800">{formatRupiah(totalExpenses)}</strong></span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center gap-1.5 text-xs font-bold">
            <Wallet className="w-3.5 h-3.5 text-teal-600" />
            <span>Sisa Kas: <strong className="font-black text-teal-800">{formatRupiah(currentSisa)}</strong></span>
          </div>

          <div className="px-2.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold">
            {filteredTransactions.length} Transaksi
          </div>
        </div>
      </div>

      {/* 2. COMPACT SEARCH & FILTER CONTROLS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Cari transaksi atau dompet..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-teal-400 transition"
          />
        </div>

        {/* Right: Dropdown Filters & Actions */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Akun Filter */}
          <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
            <select
              value={selectedAccountFilter}
              onChange={(e) => setSelectedAccountFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-teal-400"
            >
              <option value="All">Semua Akun</option>
              <option value="Tunai">Tunai / Cash</option>
              <option value="Gopay">Gopay</option>
              <option value="QRIS">QRIS</option>
              <option value="Bank BCA">Bank BCA</option>
              <option value="Bank BNI">Bank BNI</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="Bank Seabank">Bank Seabank</option>
            </select>
          </div>

          {/* Kategori Filter */}
          <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-teal-400"
            >
              <option value="All">Semua Kategori</option>
              <option value="Living">Living (Kebutuhan)</option>
              <option value="Playing">Playing (Jajan/Hiburan)</option>
              <option value="Savings">Savings (Tabungan)</option>
              <option value="Giving">Giving (Sedekah)</option>
              <option value="Makanan & Minuman">Makanan & Minuman</option>
              <option value="Kebutuhan Harian">Kebutuhan Harian</option>
            </select>
          </div>

          {/* Hapus Terpilih */}
          {transactions.some(t => t.checked) && (
            <button
              onClick={deleteSelected}
              className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus ({transactions.filter(t => t.checked).length})</span>
            </button>
          )}

          {/* + Catat Pengeluaran */}
          <button
            onClick={onOpenAddModal}
            className="bg-[#38C7B4] hover:bg-[#2DAE9C] text-white px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Catat Transaksi</span>
          </button>
        </div>

      </div>

      {/* 3. CLEAN COMPACT MODERN TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-black uppercase tracking-wider border-b border-slate-100">
                <th className="py-2.5 px-3.5 w-10 text-center">
                  <button onClick={toggleSelectAll} className="focus:outline-none">
                    {filteredTransactions.length > 0 && filteredTransactions.every(t => t.checked) ? (
                      <CheckSquare className="w-4 h-4 text-teal-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                    )}
                  </button>
                </th>
                <th className="py-2.5 px-3 w-28">Tanggal</th>
                <th className="py-2.5 px-3">Detail Transaksi</th>
                <th className="py-2.5 px-3 w-32">Akun / Dompet</th>
                <th className="py-2.5 px-3 w-36">Kategori</th>
                <th className="py-2.5 px-3 w-32 text-right">Nominal</th>
                <th className="py-2.5 px-3 w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400 font-bold">
                    Tidak ada transaksi yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((item) => (
                  <tr 
                    key={item.id}
                    className={`transition-colors hover:bg-slate-50/70 ${item.checked ? 'bg-teal-50/40' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="py-2.5 px-3.5 text-center">
                      <button onClick={() => toggleCheckbox(item.id)} className="focus:outline-none">
                        {item.checked ? (
                          <CheckSquare className="w-4 h-4 text-teal-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 hover:text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* Tanggal */}
                    <td className="py-2.5 px-3 text-slate-500 text-[11px] font-medium whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Detail & Items */}
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-900 block leading-snug">
                        {item.detail}
                      </span>
                      {item.items && item.items.length > 0 && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          {item.items.join(', ')}
                        </span>
                      )}
                    </td>

                    {/* Akun */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold">
                        <Wallet className="w-3 h-3 text-slate-400" />
                        {item.account}
                      </span>
                    </td>

                    {/* Kategori Badge */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </span>
                    </td>

                    {/* Nominal */}
                    <td className="py-2.5 px-3 text-right font-black text-rose-600 whitespace-nowrap">
                      - {formatRupiah(item.amount)}
                    </td>

                    {/* Quick Delete Row */}
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => deleteSingle(item.id)}
                        className="p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition"
                        title="Hapus transaksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="py-2.5 px-4 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center justify-between">
          <span>Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi</span>
          <span>SakuKita Pembukuan Kas v1.0</span>
        </div>
      </div>

    </div>
  );
}
