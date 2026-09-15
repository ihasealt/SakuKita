import React from 'react';
import { PieChart, BarChart3, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export default function AnalyticsCharts({ activeTheme, transactions }) {
  
  const categoryTotals = transactions.reduce((acc, curr) => {
    const cat = curr.category || 'Living';
    acc[cat] = (acc[cat] || 0) + (curr.amount || 0);
    return acc;
  }, {});

  const totalExpenseSum = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;

  const categories = Object.keys(categoryTotals);
  const colorsLumi = ['#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FFEDD5'];
  const colorsRaka = ['#64748B', '#475569', '#334155', '#94A3B8', '#CBD5E1'];

  const themeColors = activeTheme === 'lumi' ? colorsLumi : colorsRaka;

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const monthlyData = [
    { month: 'Mei', income: 4500000, expense: 3200000 },
    { month: 'Jun', income: 5000000, expense: 3800000 },
    { month: 'Jul', income: 4800000, expense: 4100000 },
    { month: 'Agu', income: 5200000, expense: 3900000 },
    { month: 'Sep', income: 6000000, expense: totalExpenseSum },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-accent)' }}>
          FR-06 Dasbor Analitik & Visualisasi Arus Kas
        </h2>
        <p className="text-xs sm:text-sm font-semibold opacity-75 mt-0.5">
          Diagram lingkaran alokasi pengeluaran per kategori & grafik batang perbandingan arus kas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Donut Chart */}
        <div className={`lg:col-span-6 p-6 sm:p-7 rounded-3xl border shadow-sm space-y-5 ${
          activeTheme === 'lumi'
            ? 'bg-white border-orange-200 text-slate-900'
            : 'bg-[#1E293B] border-slate-700 text-white'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <PieChart className={`w-6 h-6 ${activeTheme === 'lumi' ? 'text-orange-500' : 'text-slate-300'}`} />
              <h3 className="text-base font-black">Alokasi Pengeluaran per Kategori</h3>
            </div>
            <span className="text-xs font-bold opacity-75">Bulan Sep 2026</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
            
            <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-800"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                
                {(() => {
                  let accumulatedPercent = 0;
                  return categories.map((cat, idx) => {
                    const value = categoryTotals[cat];
                    const percent = (value / totalExpenseSum) * 100;
                    const strokeDasharray = `${percent} ${100 - percent}`;
                    const strokeDashoffset = -accumulatedPercent;
                    accumulatedPercent += percent;

                    return (
                      <circle
                        key={cat}
                        stroke={themeColors[idx % themeColors.length]}
                        strokeWidth="4"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="none"
                        cx="18"
                        cy="18"
                        r="15.9155"
                        className="transition-all duration-700"
                      />
                    );
                  });
                })()}
              </svg>

              <div className="absolute text-center">
                <span className="block text-xs font-black uppercase opacity-75">Total Spent</span>
                <span className="text-sm font-black">{formatRupiah(totalExpenseSum)}</span>
              </div>
            </div>

            {/* Category Legend List */}
            <div className="space-y-3 flex-1 w-full">
              {categories.map((cat, idx) => {
                const amount = categoryTotals[cat];
                const pct = Math.round((amount / totalExpenseSum) * 100);

                return (
                  <div key={cat} className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-2xs"
                        style={{ backgroundColor: themeColors[idx % themeColors.length] }}
                      ></span>
                      <span className="font-extrabold">{cat}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-black">{formatRupiah(amount)}</span>
                      <span className="text-xs opacity-75 ml-1 font-mono">({pct}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Bar Chart */}
        <div className={`lg:col-span-6 p-6 sm:p-7 rounded-3xl border shadow-sm space-y-5 ${
          activeTheme === 'lumi'
            ? 'bg-white border-orange-200 text-slate-900'
            : 'bg-[#1E293B] border-slate-700 text-white'
        }`}>
          <div className="flex items-center justify-between border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <BarChart3 className={`w-6 h-6 ${activeTheme === 'lumi' ? 'text-orange-500' : 'text-slate-300'}`} />
              <h3 className="text-base font-black">Perbandingan Arus Kas Bulanan</h3>
            </div>

            <div className="flex items-center space-x-3 text-xs font-extrabold">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Pemasukan
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span> Pengeluaran
              </span>
            </div>
          </div>

          <div className="pt-4 pb-2 flex items-end justify-between gap-4 h-48 border-b border-slate-100 dark:border-slate-800">
            {monthlyData.map((d, i) => {
              const maxVal = 7000000;
              const incomeHeight = Math.round((d.income / maxVal) * 100);
              const expenseHeight = Math.round((d.expense / maxVal) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  
                  <div className="flex items-end gap-1.5 h-full w-full justify-center">
                    <div
                      className="w-4 bg-emerald-500 rounded-t-lg transition-all duration-500 group-hover:bg-emerald-400"
                      style={{ height: `${incomeHeight}%` }}
                      title={`Pemasukan: ${formatRupiah(d.income)}`}
                    ></div>

                    <div
                      className="w-4 bg-rose-500 rounded-t-lg transition-all duration-500 group-hover:bg-rose-400"
                      style={{ height: `${expenseHeight}%` }}
                      title={`Pengeluaran: ${formatRupiah(d.expense)}`}
                    ></div>
                  </div>

                  <span className="text-xs font-black opacity-80">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm font-bold pt-1">
            <span className="opacity-75">Rata-rata Arus Kas:</span>
            <span className="text-orange-600 dark:text-slate-200 font-black flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Surpluss +Rp 2.100.000 / Bulan
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
