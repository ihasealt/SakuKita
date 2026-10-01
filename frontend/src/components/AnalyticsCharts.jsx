import React from 'react';
import { PieChart, BarChart3 } from 'lucide-react';

export default function AnalyticsCharts({ activeTheme, transactions }) {
  
  const categoryTotals = transactions.reduce((acc, curr) => {
    const cat = curr.category || 'Living';
    acc[cat] = (acc[cat] || 0) + (curr.amount || 0);
    return acc;
  }, {});

  const totalExpenseSum = Object.values(categoryTotals).reduce((a, b) => a + b, 0) || 1;
  const categories = Object.keys(categoryTotals);
  const themeColors = ['#38C7B4', '#FF7D7D', '#FFB74D', '#818CF8', '#A78BFA'];

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
    <div className="space-y-4 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-base font-black tracking-tight text-slate-800 flex items-center gap-2" style={{ fontFamily: 'var(--font-accent)' }}>
            <BarChart3 className="w-5 h-5 text-teal-600" />
            FR-06 Dasbor Analitik & Visualisasi Arus Kas
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Analisis alokasi pengeluaran per kategori & tren arus kas per bulan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        
        {/* Category Breakdown Card */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center space-x-2">
              <PieChart className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs md:text-sm font-black text-slate-800">Alokasi per Kategori</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">Total: {formatRupiah(totalExpenseSum)}</span>
          </div>

          {/* Simple Clean Proportional Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100">
            {categories.map((cat, idx) => {
              const value = categoryTotals[cat];
              const pct = (value / totalExpenseSum) * 100;
              return (
                <div
                  key={cat}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: themeColors[idx % themeColors.length]
                  }}
                  className="h-full transition-all"
                  title={`${cat}: ${formatRupiah(value)} (${Math.round(pct)}%)`}
                />
              );
            })}
          </div>

          {/* Category List Items */}
          <div className="space-y-2 pt-1">
            {categories.map((cat, idx) => {
              const amount = categoryTotals[cat];
              const pct = Math.round((amount / totalExpenseSum) * 100);
              const color = themeColors[idx % themeColors.length];
              return (
                <div key={cat} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                    <span className="text-slate-700">{cat}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-black text-slate-800">{formatRupiah(amount)}</span>
                    <span className="text-slate-400 text-[10px] w-8 text-right font-bold">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Trend Card */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs md:text-sm font-black text-slate-800">Tren Pemasukan vs Pengeluaran</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">5 Bulan Terakhir</span>
          </div>

          <div className="h-44 flex items-end justify-between px-2 pt-2 pb-1 gap-2">
            {monthlyData.map(m => {
              const incH = (m.income / 6500000) * 100;
              const expH = (m.expense / 6500000) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center">
                  <div className="flex items-end justify-center space-x-1 h-32 w-full">
                    <div 
                      style={{ height: `${incH}%` }} 
                      className="w-2.5 rounded-t bg-[#38C7B4]"
                      title={`Pemasukan: ${formatRupiah(m.income)}`}
                    ></div>
                    <div 
                      style={{ height: `${expH}%` }} 
                      className="w-2.5 rounded-t bg-[#FF7D7D]"
                      title={`Pengeluaran: ${formatRupiah(m.expense)}`}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-2">{m.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center space-x-4 pt-1 border-t border-slate-100 text-[10px] font-bold">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38C7B4]"></span>
              <span className="text-slate-500">Pemasukan</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF7D7D]"></span>
              <span className="text-slate-500">Pengeluaran</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
