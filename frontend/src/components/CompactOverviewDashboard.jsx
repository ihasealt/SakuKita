import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  BarChart2, 
  LineChart as LineChartIcon, 
  Filter, 
  Heart, 
  Wallet, 
  FileText, 
  Sparkles,
  Zap, 
  Flame
} from 'lucide-react';

export default function CompactOverviewDashboard({
  activeTheme,
  setActiveTheme,
  wallets,
  transactions,
  onOpenAddModal,
  setActiveTab,
  searchTerm,
  setSearchTerm
}) {
  const [chartViewMode, setChartViewMode] = useState('bar');
  const [selectedDayHover, setSelectedDayHover] = useState(null);

  const weeklyAnalyticsData = [
    { day: 'Mon', income: 20, expense: 12, label: 'Senin', incVal: 'Rp 200.000', expVal: 'Rp 120.000' },
    { day: 'Tue', income: 16, expense: 8, label: 'Selasa', incVal: 'Rp 160.000', expVal: 'Rp 80.000' },
    { day: 'Wed', income: 18, expense: 14, label: 'Rabu', incVal: 'Rp 180.000', expVal: 'Rp 140.000' },
    { day: 'Thu', income: 15, expense: 9, label: 'Kamis', incVal: 'Rp 150.000', expVal: 'Rp 90.000' },
    { day: 'Fri', income: 21, expense: 17, label: 'Jumat', incVal: 'Rp 210.000', expVal: 'Rp 170.000' },
    { day: 'Sat', income: 19, expense: 11, label: 'Sabtu', incVal: 'Rp 190.000', expVal: 'Rp 110.000' },
    { day: 'Sun', income: 22, expense: 15, label: 'Minggu', incVal: 'Rp 220.000', expVal: 'Rp 150.000' },
  ];

  return (
    <div className="space-y-4">

      {/* 1. TOP BAR: Pill Search Input + Add Transaction Pill Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Pill Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search something..."
            className="w-full py-2 pl-4 pr-11 rounded-xl text-xs md:text-sm font-semibold bg-white border border-slate-200/80 text-slate-800 placeholder-slate-400 outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-100 transition shadow-xs"
          />
          <button 
            onClick={() => setActiveTab('history')}
            className={`absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg flex items-center justify-center text-white transition ${
              activeTheme === 'lumi' ? 'bg-[#38C7B4] hover:bg-[#2DAE9C]' : 'bg-[#EF4444] hover:bg-[#DC2626]'
            }`}
            title="Cari Data"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Button: + Add transaction */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-black transition shadow-xs border ${
              activeTheme === 'lumi'
                ? 'bg-white border-teal-200 text-teal-700 hover:bg-teal-50'
                : 'bg-white border-rose-200 text-rose-700 hover:bg-rose-50'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add transaction</span>
          </button>

          {/* Quick theme pill */}
          <button
            onClick={() => setActiveTheme(activeTheme === 'lumi' ? 'raka' : 'lumi')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-black border transition shadow-xs ${
              activeTheme === 'lumi'
                ? 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
                : 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100'
            }`}
            title="Ganti Tema Pokemon"
          >
            {activeTheme === 'lumi' ? (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Lumi ⚡</span>
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Raka 🔥</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* 2. GREETING BANNER & 2 MINI SPARKLINE CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">

        {/* Left Hero Greeting Card */}
        <div className={`lg:col-span-8 p-5 md:p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between text-white shadow-xs ${
          activeTheme === 'lumi'
            ? 'bg-gradient-to-r from-[#38C7B4] via-[#3DBFAC] to-[#45CBB8]'
            : 'bg-gradient-to-r from-[#EF4444] via-[#F43F5E] to-[#F97316]'
        }`}>
          {/* Decorative floating pills */}
          <div className="absolute top-3 right-6 pointer-events-none opacity-30 select-none flex items-center space-x-2">
            <span className="w-8 h-4 rounded-full bg-white/40 -rotate-12 block"></span>
            <span className="w-10 h-5 rounded-full bg-white/50 rotate-45 block"></span>
          </div>

          <div className="relative z-10 max-w-md">
            <h2 className="text-lg md:text-xl font-black tracking-tight" style={{ fontFamily: 'var(--font-accent)' }}>
              Hi, Jennifer!
            </h2>
            <p className="text-xs md:text-sm font-semibold opacity-95 mt-1 leading-relaxed">
              You've been doing your whole work plan for the last two months. Way to go 👍
            </p>
          </div>

          <div className="relative z-10 mt-4 flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('input')}
              className="text-xs font-black px-3.5 py-1.5 rounded-lg bg-white text-slate-800 hover:bg-slate-50 transition shadow-xs flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>AI Quick Input</span>
            </button>
            <span className="text-[10px] font-bold opacity-90">
              {activeTheme === 'lumi' ? '⚡ Lumi Pokemon Companion' : '🔥 Raka Fin-Officer'}
            </span>
          </div>
        </div>

        {/* 2 Mini Stat / Sparkline Cards */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          
          {/* Mini Card 1: +11 reviews */}
          <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <span className={`text-base font-black tracking-tight ${
                activeTheme === 'lumi' ? 'text-teal-600' : 'text-rose-600'
              }`}>
                +11
              </span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                reviews
              </p>
            </div>

            <div className="mt-2">
              <svg viewBox="0 0 100 35" className="w-full h-7 overflow-visible">
                <path
                  d="M 0,28 C 25,28 35,10 50,18 C 65,26 75,5 100,8"
                  fill="none"
                  stroke="#FF7272"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Mini Card 2: +78 patients */}
          <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <span className={`text-base font-black tracking-tight ${
                activeTheme === 'lumi' ? 'text-teal-600' : 'text-rose-600'
              }`}>
                +78
              </span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                patients
              </p>
            </div>

            <div className="mt-2">
              <svg viewBox="0 0 100 35" className="w-full h-7 overflow-visible">
                <path
                  d="M 0,25 C 20,20 40,30 60,12 C 75,5 85,20 100,6"
                  fill="none"
                  stroke="#38C7B4"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

        </div>

      </div>

      {/* 3. PATIENT ANALYTICS / 3 HORIZONTAL COLORED METRIC CARDS */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h3 className="text-[11px] font-black tracking-tight uppercase text-slate-400">
            Patient analytics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Card 1: Coral / Red-Pink */}
          <div 
            onClick={() => setActiveTab('history')}
            className="p-3.5 rounded-xl bg-[#FF7D7D] text-white flex items-center space-x-3 cursor-pointer shadow-xs transition hover:opacity-95"
          >
            <div className="w-9 h-9 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0 text-white">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-[11px] font-semibold opacity-90 leading-tight">Appointments today</p>
              <h4 className="text-sm md:text-base font-black tracking-tight mt-0.5">18 persons</h4>
            </div>
          </div>

          {/* Card 2: Warm Amber / Yellow-Orange */}
          <div 
            onClick={() => setActiveTab('wallets')}
            className="p-3.5 rounded-xl bg-[#FFB74D] text-white flex items-center space-x-3 cursor-pointer shadow-xs transition hover:opacity-95"
          >
            <div className="w-9 h-9 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0 text-white">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold opacity-90 leading-tight">New patients</p>
              <h4 className="text-sm md:text-base font-black tracking-tight mt-0.5">125 for the month</h4>
            </div>
          </div>

          {/* Card 3: Soft Teal / Cyan */}
          <div 
            onClick={() => setActiveTab('wallets')}
            className="p-3.5 rounded-xl bg-[#5EC2D7] text-white flex items-center space-x-3 cursor-pointer shadow-xs transition hover:opacity-95"
          >
            <div className="w-9 h-9 rounded-lg bg-white/25 flex items-center justify-center flex-shrink-0 text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-semibold opacity-90 leading-tight">Total patients</p>
              <h4 className="text-sm md:text-base font-black tracking-tight mt-0.5">2000+</h4>
            </div>
          </div>

        </div>
      </div>

      {/* 4. VISUAL ANALYTICS: Dual Bar Chart & Radial Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Left Column: This week's analytics overview */}
        <div className="lg:col-span-8 p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs md:text-sm font-black tracking-tight text-slate-800">
              This week's analytics overview
            </h4>

            <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-slate-100">
              <button
                onClick={() => setChartViewMode('bar')}
                className={`p-1 rounded-md transition ${
                  chartViewMode === 'bar' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Bar View"
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartViewMode('line')}
                className={`p-1 rounded-md transition ${
                  chartViewMode === 'line' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Line View"
              >
                <LineChartIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dual Bar Chart Area */}
          <div className="h-48 w-full flex items-end justify-between pt-4 pb-1 px-1 relative">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-x-0 top-0 bottom-5 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-dashed border-slate-400 w-full flex justify-between text-[9px] text-slate-400 -mt-2"><span>25</span></div>
              <div className="border-b border-dashed border-slate-400 w-full flex justify-between text-[9px] text-slate-400 -mt-2"><span>20</span></div>
              <div className="border-b border-dashed border-slate-400 w-full flex justify-between text-[9px] text-slate-400 -mt-2"><span>15</span></div>
              <div className="border-b border-dashed border-slate-400 w-full flex justify-between text-[9px] text-slate-400 -mt-2"><span>10</span></div>
              <div className="border-b border-dashed border-slate-400 w-full flex justify-between text-[9px] text-slate-400 -mt-2"><span>5</span></div>
            </div>

            {/* 7 Day Columns */}
            {weeklyAnalyticsData.map((item, idx) => {
              const isHovered = selectedDayHover === idx;
              return (
                <div 
                  key={item.day}
                  onMouseEnter={() => setSelectedDayHover(idx)}
                  onMouseLeave={() => setSelectedDayHover(null)}
                  className="flex flex-col items-center flex-1 z-10 group cursor-pointer"
                >
                  {isHovered && (
                    <div className="absolute -top-7 px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold shadow-md pointer-events-none whitespace-nowrap">
                      {item.label}: Masuk {item.incVal} | Keluar {item.expVal}
                    </div>
                  )}

                  <div className="flex items-end justify-center space-x-1 h-36 w-full">
                    {/* Primary Bar */}
                    <div 
                      style={{ height: `${(item.income / 25) * 100}%` }}
                      className={`w-2 rounded-full transition-all ${
                        activeTheme === 'lumi' ? 'bg-[#38C7B4]' : 'bg-[#EF4444]'
                      }`}
                    ></div>

                    {/* Secondary Bar */}
                    <div 
                      style={{ height: `${(item.expense / 25) * 100}%` }}
                      className="w-2 rounded-full bg-[#FF7D7D] transition-all"
                    ></div>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-400 mt-1.5">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bar Legend */}
          <div className="flex items-center justify-center space-x-5 pt-2 border-t border-slate-100 text-[10px] font-bold">
            <div className="flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${activeTheme === 'lumi' ? 'bg-[#38C7B4]' : 'bg-[#EF4444]'}`}></span>
              <span className="text-slate-500">Pemasukan / Anggaran</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF7D7D]"></span>
              <span className="text-slate-500">Pengeluaran Riil</span>
            </div>
          </div>
        </div>

        {/* Right Column: Progress */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs md:text-sm font-black tracking-tight text-slate-800">
              Progress
            </h4>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="p-1 rounded-md bg-slate-100 text-slate-400 hover:text-slate-700"
              title="Lihat Detail"
            >
              <Filter className="w-3 h-3" />
            </button>
          </div>

          {/* Concentric Rings */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="66" fill="none" stroke="#E2F3F0" strokeWidth="8" />
                <circle cx="80" cy="80" r="66" fill="none" stroke="#38C7B4" strokeWidth="8" strokeDasharray="414" strokeDashoffset="120" strokeLinecap="round" />

                <circle cx="80" cy="80" r="50" fill="none" stroke="#FFE8E8" strokeWidth="8" />
                <circle cx="80" cy="80" r="50" fill="none" stroke="#FF7D7D" strokeWidth="8" strokeDasharray="314" strokeDashoffset="140" strokeLinecap="round" />

                <circle cx="80" cy="80" r="34" fill="none" stroke="#FEF3C7" strokeWidth="8" />
                <circle cx="80" cy="80" r="34" fill="none" stroke="#FFB74D" strokeWidth="8" strokeDasharray="213" strokeDashoffset="60" strokeLinecap="round" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-black tracking-tight text-slate-800" style={{ fontFamily: 'var(--font-accent)' }}>
                  82%
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">
                  Target
                </span>
              </div>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] font-semibold">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38C7B4]"></span>
                <span className="text-slate-500">Health (Kebutuhan)</span>
              </div>
              <span className="font-black text-slate-800">65%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF7D7D]"></span>
                <span className="text-slate-500">Continue treatment (Jajan)</span>
              </div>
              <span className="font-black text-slate-800">20%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FFB74D]"></span>
                <span className="text-slate-500">Neutral (Tabungan)</span>
              </div>
              <span className="font-black text-slate-800">15%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
