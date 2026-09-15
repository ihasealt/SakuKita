import React from 'react';
import { Wallet, Calendar, LayoutDashboard, Plus, Search, Sparkles, Cat } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenAddExpense, onOpenAddTask, searchTerm, setSearchTerm }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-800" style={{ fontFamily: 'var(--font-accent)' }}>
                  SakuKita
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                  <Cat className="w-3 h-3" /> v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Finansial & Manajer Jadwal Harian</p>
            </div>
          </div>

          {/* View Switcher Tabs */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setActiveView('finance')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeView === 'finance'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Laporan Keuangan</span>
              <span className="sm:hidden">Keuangan</span>
            </button>

            <button
              onClick={() => setActiveView('task')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeView === 'task'
                  ? 'bg-slate-900 text-emerald-400 shadow-md shadow-slate-900/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Jadwal & Tasks</span>
              <span className="sm:hidden">Tasks</span>
            </button>

            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeView === 'dashboard'
                  ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard Gabungan</span>
              <span className="md:hidden">Gabungan</span>
            </button>
          </nav>

          {/* Quick Action Buttons & Search */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Search */}
            <div className="relative hidden md:block w-44 lg:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari transaksi / tugas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            {/* Add Action Buttons */}
            {activeView === 'finance' ? (
              <button
                onClick={onOpenAddExpense}
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm hover:shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Catat Catatan</span>
              </button>
            ) : activeView === 'task' ? (
              <button
                onClick={onOpenAddTask}
                className="flex items-center space-x-1.5 bg-lime-400 hover:bg-lime-500 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm hover:shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Task</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={onOpenAddExpense}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition"
                  title="Tambah Transaksi"
                >
                  <Plus className="w-4 h-4 inline sm:mr-1" />
                  <span className="hidden sm:inline">+ Keuangan</span>
                </button>
                <button
                  onClick={onOpenAddTask}
                  className="bg-slate-900 hover:bg-slate-800 text-lime-400 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition"
                  title="Tambah Task"
                >
                  <Plus className="w-4 h-4 inline sm:mr-1" />
                  <span className="hidden sm:inline">+ Task</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
